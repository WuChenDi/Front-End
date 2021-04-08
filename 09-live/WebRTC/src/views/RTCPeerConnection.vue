<template>
  <div class="mediaDevices">
    <div style="display: flex">
      <video autoplay playsinline ref="refLocalVideo"></video>

      <video autoplay playsinline ref="refRemoteVideo"></video>
    </div>
    <br />
    <br />
    <br />
    <a-space size="large">
      <a-button type="primary" @click="handleStart"> start </a-button>
      <a-button type="primary" @click="handleCall"> call </a-button>
      <a-button type="primary" @click="handleHangup"> hang up </a-button>
    </a-space>
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

    let stream: any;
    let pc1: any = null;
    let pc2: any = null;
    const buffer: any[] = [];

    onMounted(async () => {
      console.log(adapter);
      console.log(adapter.browserDetails.browser);
    });

    function handleDataAvailable(e: any) {
      if (e?.data?.size > 0) {
        buffer.push(e.data);
      }
    }
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
        offerToReceiveAudio: 0,
        offerToReceiveVideo: 1,
      };

      pc1 = new RTCPeerConnection();
      pc1.onicecandidate = (e) => {
        // send candidate to peer
        // receive candidate from peer

        pc2.addIceCandidate(e.candidate).catch((err) => {
          console.log(`getUserMedia error: ${err}`);
        });
        console.log("pc1 ICE candidate:", e.candidate);
      };

      pc1.iceconnectionstatechange = (e) => {
        // console.log(`pc1 ICE state: ${pc.iceConnectionState}`);
        console.log("ICE state change event: ", e);
      };

      pc2 = new RTCPeerConnection();
      pc2.onicecandidate = (e) => {
        // send candidate to peer
        // receive candidate from peer

        pc1.addIceCandidate(e.candidate).catch((err) => {
          console.log(`getUserMedia error: ${err}`);
        });
        console.log("pc2 ICE candidate:", e.candidate);
      };

      pc2.iceconnectionstatechange = (e) => {
        // console.log(`pc2 ICE state: ${pc.iceConnectionState}`);
        console.log("ICE state change event: ", e);
      };

      pc2.ontrack = function gotRemoteStream(e) {
        if (
          (refRemoteVideo.value as HTMLVideoElement).srcObject !== e.streams[0]
        ) {
          (refRemoteVideo.value as HTMLVideoElement).srcObject = e.streams[0];
        }
      };

      //add Stream to caller
      stream.getTracks().forEach((track) => {
        pc1.addTrack(track, stream);
      });

      try {
        const desc = await pc1.createOffer(offerOptions);

        pc1.setLocalDescription(desc);

        //send sdp to callee

        //receive sdp from caller
        pc2.setRemoteDescription(desc);
        pc2
          .createAnswer()
          .then((desc2) => {
            pc2.setLocalDescription(desc2);

            //send sdp to caller
            //recieve sdp from callee

            pc1.setRemoteDescription(desc2);
          })
          .catch((error) => {
            console.log("Failed to call getUserMedia", error);
          });
      } catch (error) {
        console.log("Failed to call getUserMedia", error);
      }
    };

    const handleHangup = () => {
      pc1.close();
      pc2.close();
      pc1 = null;
      pc2 = null;
    };

    return {
      refLocalVideo,
      refRemoteVideo,
      handleStart,
      handleCall,
      handleHangup,
    };
  },
});
</script>