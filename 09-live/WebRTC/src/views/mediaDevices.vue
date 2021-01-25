<template>
  <div class="mediaDevices">
    <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 8 }">
      <a-form-item label="audio input device">
        <a-select v-model:value="audioInputValue">
          <a-select-option
            v-for="d in audioInputOption"
            :key="d.deviceId"
            :value="d.deviceId"
          >
            {{ d.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="audio output device">
        <a-select v-model:value="audioOutputValue" style="min-width: 120px">
          <a-select-option
            v-for="d in audioOutputOption"
            :key="d.deviceId"
            :value="d.deviceId"
          >
            {{ d.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="video input device">
        <a-select v-model:value="videoInputValue" style="min-width: 120px">
          <a-select-option
            v-for="d in videoInputOption"
            :key="d.deviceId"
            :value="d.deviceId"
          >
            {{ d.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Filter">
        <a-select v-model:value="filterValue" style="min-width: 120px">
          <a-select-option
            v-for="d in filterOption"
            :key="d.value"
            :value="d.value"
          >
            {{ d.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="handleTakeSnapshout">
      Take snapshout
    </a-button>
    <div style="display: flex">
      <video
        autoplay
        playsinline
        ref="refVideoPlay"
        :class="filterValue"
      ></video>
      <audio autoplay controls ref="refAudioPlay"></audio>
      <canvas ref="refPicture" :class="filterValue"></canvas>
    </div>

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
  name: "mediaDevices",
  setup() {
    // const refVideoPlay = ref<HTMLVideoElement | null>(null);
    // const refAudioPlay = ref<HTMLAudioElement | null>(null);
    // const refPicture = ref<HTMLCanvasElement | null>(null);
    const refVideoPlay = ref<any>(null);
    const refAudioPlay = ref<any>(null);
    const refPicture = ref<any>(null);

    const audioInputValue = ref("default");
    const audioInputOption = ref([]);
    const audioOutputValue = ref("default");
    const audioOutputOption = ref([]);
    const videoInputValue = ref("default");
    const videoInputOption = ref([]);
    const filterValue = ref("");
    const filterOption = ref([
      { label: "None", value: "None" },
      { label: "灰度", value: "grayscale" },
      { label: "褐色", value: "sepia" },
      { label: "饱和度", value: "saturate" },
      { label: "色相旋转", value: "hue-rotate" },
      { label: "反色", value: "invert" },
      { label: "透明度", value: "opacity" },
      { label: "亮度", value: "brightness" },
      { label: "对比度", value: "contrast" },
      { label: "模糊", value: "blur" },
      { label: "阴影", value: "drop-shadow" },
    ]);
    const MediaStreamAPI = ref({});

    // mounted -> onMounted
    onMounted(async () => {
      console.log(adapter);
      console.log(adapter.browserDetails.browser);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia is not supported!");
      } else {
        const constraints = {
          video: {
            width: {
              min: 200,
              max: 400,
            },
            height: {
              min: 200,
              max: 400,
            },
            // 帧
            frameRate: {
              min: 15,
              max: 120,
            },
            // facingMode: "environment", // 摄像头
          },
          // audio: {
          //   noiseSuppression: true, // 降噪
          //   echoCancellation: true, // 回声消除
          // },
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          // refAudioPlay.value.srcObject = stream;
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

          const deviceInfos: Array<MediaDeviceInfo> = await navigator.mediaDevices.enumerateDevices();
          audioInputOption.value = deviceInfos.filter(
            (item: MediaDeviceInfo) => item.kind === "audioinput"
          ) as [];
          audioOutputOption.value = deviceInfos.filter(
            (item: MediaDeviceInfo) => item.kind === "audiooutput"
          ) as [];
          videoInputOption.value = deviceInfos.filter(
            (item: MediaDeviceInfo) => item.kind === "videoinput"
          ) as [];

          const { deviceId = "" } = videoInputOption.value[0];
          videoInputValue.value = deviceId;

          refPicture.value.style.width = "320px";
          refPicture.value.style.height = "240px";
        } catch (err) {
          console.log(`getUserMedia error: ${err}`);
        }
      }
    });

    const handleTakeSnapshout = () => {
      const { width, height } = refPicture.value.getBoundingClientRect();

      refPicture.value
        .getContext("2d")
        .drawImage(refVideoPlay.value, 0, 0, width, height);
    };

    return {
      refVideoPlay,
      refAudioPlay,
      refPicture,
      audioInputValue,
      audioInputOption,
      audioOutputValue,
      audioOutputOption,
      videoInputValue,
      videoInputOption,
      filterValue,
      filterOption,
      handleTakeSnapshout,
      MediaStreamAPI,
    };
  },
});
</script>

<style scoped lang="scss">
.mediaDevices {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .None {
    filter: none;
  }
  .grayscale {
    filter: grayscale(1);
  }
  .sepia {
    filter: sepia(1);
  }
  .saturate {
    filter: saturate(3);
  }
  .hue-rotate {
    filter: hue-rotate(180deg);
  }
  .invert {
    filter: invert(10);
  }
  .opacity {
    filter: opacity(90%);
  }
  .brightness {
    filter: brightness(3);
  }
  .contrast {
    filter: contrast(3);
  }
  .blur {
    filter: blur(3px);
  }
  .drop-shadow {
    filter: drop-shadow(8px 8px 10px #42b983);
  }
}
</style>