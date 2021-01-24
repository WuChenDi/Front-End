<template>
  <div>
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
    <video autoplay playsinline id="player" :class="filterValue"></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import adapter from "webrtc-adapter";

export default defineComponent({
  name: "mediaDevices",
  setup() {
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

    let videoplay: any;
    // mounted -> onMounted
    onMounted(() => {
      console.log(adapter);
      console.log(adapter.browserDetails.browser);
      videoplay = document.getElementById("player");

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia is not supported!");
      } else {
        const constraints = {
          video: {
            // width: 320,
            // height: 240,
            // frameRate: 120, // 帧
            // facingMode: "environment", // 摄像头
            width: {
              min: 200,
              max: 400,
            },
            height: {
              min: 200,
              max: 400,
            },
            frameRate: {
              min: 15,
              max: 120,
            },
          },
          // audio: {
          //   noiseSuppression: true, // 降噪
          //   echoCancellation: true, // 回声消除
          // },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            videoplay.srcObject = stream;
            return navigator.mediaDevices.enumerateDevices();
          })
          .then((deviceInfos) => {
            audioInputOption.value = deviceInfos.filter(
              (item) => item.kind === "audioinput"
            ) as any;
            audioOutputOption.value = deviceInfos.filter(
              (item) => item.kind === "audiooutput"
            ) as any;
            videoInputOption.value = deviceInfos.filter(
              (item) => item.kind === "videoinput"
            ) as any;
            const { deviceId = "" } = videoInputOption.value[0];
            videoInputValue.value = deviceId;
          })
          .catch((err) => {
            console.log(`getUserMedia error: ${err}`);
          });
      }
    });

    // const handleFilterChange = (val: string) => {
    //   console.log(val);
    //   videoplay.className = val;
    // };
    return {
      audioInputValue,
      audioInputOption,
      audioOutputValue,
      audioOutputOption,
      videoInputValue,
      videoInputOption,
      filterValue,
      filterOption,
      // handleFilterChange,
    };
  },
});
</script>

<style scoped lang="scss">
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
</style>