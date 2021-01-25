<template>
  <div class="mediaDevices">
    <div style="display: flex">
      <video
        autoplay
        playsinline
        ref="refVideoPlay"
        :class="filterValue"
      ></video>

      <video playsinline ref="refRecplayer"></video>
    </div>
    <br />
    <a-space size="large">
      <a-button type="primary" @click="handleOutput"> output </a-button>
      <a-button type="primary" @click="handleRecord">
        {{ recordStatus ? "Start" : "Stop" }} Record
      </a-button>
      <a-button type="primary" :disabled="!recordStatus" @click="handlePlay">
        play
      </a-button>
      <a-button
        type="primary"
        :disabled="!recordStatus"
        @click="handleDownload"
      >
        Download
      </a-button>
    </a-space>
    <br />
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 8 }">
      <a-form-item
        v-for="(value, key, index) in MediaStreamAPI"
        :key="index"
        :label="key"
      >
        {{ value }}
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import adapter from "webrtc-adapter";

export default defineComponent({
  name: "mediaRecoder",
  setup() {
    // const refVideoPlay = ref<HTMLVideoElement | null>(null);
    // const refRecplayer = ref<HTMLVideoElement | null>(null);
    const refVideoPlay = ref<any>(null);
    const refRecplayer = ref<any>(null);
    const recordStatus = ref(true);
    const MediaStreamAPI = ref({});

    let stream: any;

    // mounted -> onMounted
    onMounted(async () => {
      console.log(adapter);
      console.log(adapter.browserDetails.browser);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia is not supported!");
      } else {
        const constraints = {
          video: true,
          audio: false,
        };
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          refVideoPlay.value.srcObject = stream;

          const videoTrack = stream.getVideoTracks();
          const videoConstraints = videoTrack[0].getSettings();
          MediaStreamAPI.value = videoConstraints;
          console.log(MediaStreamAPI.value);

          // 标签设置 autoplay 自动播放，但是注意兼容
          // 更多设置请转移查看: https://www.yuque.com/wuchendi/fe/gflcap
          // refVideoPlay.value.onloadedmetadata = async () => {
          //   await refVideoPlay.value.play();
          // };
        } catch (err) {
          console.log(`getUserMedia error: ${err}`);
        }
      }
    });

    function handleDataAvailable(e: any) {
      if (e?.data?.size > 0) {
        buffer.push(e.data);
      }
    }
    const handleOutput = () => {};

    let mediaRecorder: any = null;

    const buffer: any[] = [];
    const handleRecord = () => {
      if (recordStatus.value) {
        const mineType = "video/webm;codecs=vp8";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!MediaRecorder.isTypeSupported(mineType)) {
          console.error(`${mineType} is not supported!`);
          return;
        }
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mediaRecorder = new MediaRecorder(stream, {
            mineType: "video/webm;codecs=vp8",
          });
          mediaRecorder.ondataavailable = handleDataAvailable;
          mediaRecorder.start(10);
        } catch (error) {
          console.error(`Failed to create MediaRecorder: ${error}`);
        }
      } else {
        console.log(mediaRecorder);

        mediaRecorder.stop();
      }
      recordStatus.value = !recordStatus.value;
    };

    const handlePlay = () => {
      const blob = new Blob(buffer, { type: "video/webm" });
      refRecplayer.value.src = window.URL.createObjectURL(blob);
      refRecplayer.value.srcObject = null;
      refRecplayer.value.controls = true;
      refRecplayer.value.play();
    };

    const handleDownload = () => {
      const blob = new Blob(buffer, { type: "video/webm" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.style.display = "none";
      a.download = "aaa.webm";
      a.click();
    };

    return {
      refVideoPlay,
      refRecplayer,
      recordStatus,
      MediaStreamAPI,
      handleOutput,
      handleRecord,
      handlePlay,
      handleDownload,
    };
  },
});
</script>
