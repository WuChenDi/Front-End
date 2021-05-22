<template>
  <div class="RTCPeerConnection">
    <a-space size="large">
      <a-button type="primary" @click="handleStart"> start </a-button>
      <a-button type="primary" @click="handleCall"> call </a-button>
      <a-button type="primary" @click="handleHangup"> hang up </a-button>
    </a-space>

    <br />
    <br />
    <br />
    <div class="video-wrapper">
      <div class="left-wrap">
        <h1>Local:</h1>
        <video autoplay playsinline ref="refLocalVideo"></video>
        <h1>Offer SDP:</h1>
        <a-textarea v-model:value="offerValue" auto-size disabled />
      </div>
      <div class="right-wrap">
        <h1>Remote:</h1>
        <video autoplay playsinline ref="refRemoteVideo"></video>
        <h1>Answer SDP:</h1>
        <a-textarea v-model:value="answerValue" auto-size disabled />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import adapter from "webrtc-adapter";

export default defineComponent({
  name: "RTCPeerConnection",
  setup() {
    const refLocalVideo = ref<HTMLVideoElement | null>(null);
    const refRemoteVideo = ref<HTMLVideoElement | null>(null);
    const offerValue = ref<string>("no data");
    const answerValue = ref<string>("no data");

    let stream: MediaStream | MediaSource | Blob | null;
    let pc1: RTCPeerConnection;
    let pc2: RTCPeerConnection;

    onMounted(async () => {
      console.log(adapter);
      console.log(adapter.browserDetails.browser);
    });

    const handleStart = async () => {
      const constraints = {
        video: true,
        audio: false,
      };

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia is not supported!");
      } else {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          (refLocalVideo.value as HTMLVideoElement).srcObject = stream;
        } catch (err) {
          console.log(`getUserMedia error: ${err}`);
        }
      }
    };

    const handleCall = async () => {
      const offerOptions = {
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
      };

      pc1 = new RTCPeerConnection();
      pc1.onicecandidate = (e: { candidate: any }) => {
        // send candidate to peer
        // receive candidate from peer

        pc2.addIceCandidate(e.candidate).catch((err) => {
          console.log(`getUserMedia error: ${err}`);
        });
        console.log("pc1 ICE candidate:", e.candidate);
      };
      pc1.oniceconnectionstatechange = (e) => {
        console.log(`pc1 ICE state: ${pc1.iceConnectionState}`);
        console.log("ICE state change event: ", e);
      };

      pc2 = new RTCPeerConnection();
      pc2.onicecandidate = (e: { candidate: any }) => {
        // send candidate to peer
        // receive candidate from peer
        pc1.addIceCandidate(e.candidate).catch((err) => {
          console.log(`getUserMedia error: ${err}`);
        });
        console.log("pc2 ICE candidate:", e.candidate);
      };

      pc2.oniceconnectionstatechange = (e) => {
        console.log(`pc2 ICE state: ${pc2.iceConnectionState}`);
        console.log("ICE state change event: ", e);
      };

      pc2.ontrack = (e) => {
        if (
          (refRemoteVideo.value as HTMLVideoElement).srcObject !== e.streams[0]
        ) {
          (refRemoteVideo.value as HTMLVideoElement).srcObject = e.streams[0];
        }
      };

      // add Stream to caller
      (stream as MediaStream).getTracks().forEach((track) => {
        return pc1.addTrack(track, stream as MediaStream);
      });

      try {
        const desc = await pc1.createOffer(offerOptions);
        const { sdp = "" } = desc;
        offerValue.value = sdp;

        await pc1.setLocalDescription(desc);
        // send sdp to callee
        // receive sdp from caller
        await pc2.setRemoteDescription(desc);

        const desc2 = await pc2.createAnswer();
        await pc2.setLocalDescription(desc2);
        const { sdp: answer = "" } = desc2;
        answerValue.value = answer;
        // send sdp to caller
        // receive sdp from callee
        await pc1.setRemoteDescription(desc2);
      } catch (error) {
        console.log("Failed to call getUserMedia", error);
      }
    };

    const handleHangup = () => {
      pc1.close();
      pc2.close();
    };

    return {
      refLocalVideo,
      refRemoteVideo,
      offerValue,
      answerValue,
      handleStart,
      handleCall,
      handleHangup,
    };
  },
});
</script>

<style scoped lang="scss">
.RTCPeerConnection {
  .video-wrapper {
    display: flex;
    justify-content: space-around;
    video {
      width: 400px;
      height: 300px;
    }
  }
}
</style>
