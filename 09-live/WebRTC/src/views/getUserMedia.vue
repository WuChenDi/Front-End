<template>
  <div class="home">
    <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 6 }">
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
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Constraints {
  video: boolean;
  audio: boolean;
}

export default defineComponent({
  name: "getUserMedia",
  setup() {
    const audioInputValue = ref("default");
    const audioInputOption = ref([]);
    const audioOutputValue = ref("default");
    const audioOutputOption = ref([]);
    const videoInputValue = ref("default");
    const videoInputOption = ref([]);

    // 访问用户媒体设备
    function getUserMedia(constraints: Constraints) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            console.log(stream);
          })
          .catch((error) => {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
          });
      }
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices is not supported!");
    } else {
      const constraints = { video: true, audio: true };
      getUserMedia(constraints);
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices: Array<MediaDeviceInfo>) => {
          audioInputOption.value = devices.filter(
            (item: MediaDeviceInfo) => item.kind === "audioinput"
          ) as [];
          audioOutputOption.value = devices.filter(
            (item: MediaDeviceInfo) => item.kind === "audiooutput"
          ) as [];
          videoInputOption.value = devices.filter(
            (item: MediaDeviceInfo) => item.kind === "videoinput"
          ) as [];

          const { deviceId = "" } = videoInputOption.value[0];
          videoInputValue.value = deviceId;

          // audioInputValue.value = audioInputOption.value[0].deviceId;
          // audioOutputValue.value = audioOutputOption.value[0].deviceId;
        })
        .catch((err: any) => {
          console.log(err.name + " : " + err.message);
        });
    }

    return {
      audioInputValue,
      audioInputOption,
      audioOutputValue,
      audioOutputOption,
      videoInputValue,
      videoInputOption,
    };
  },
});
</script>
