<template>
  <div class="socketIO">
    <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="user name">
        <a-input v-model:value="form.UserName" />
      </a-form-item>
      <a-form-item label="room">
        <a-input v-model:value="form.room" />
        <a-button type="primary" @click="joinRoom"> joinRoom </a-button>
      </a-form-item>
      <a-form-item label="content">
        <a-input v-model:value="form.content" />
      </a-form-item>
      <a-form-item label="input">
        <a-input v-model:value="form.input" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleSend"> send </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VueSocketIO from "vue-socket.io";

export default defineComponent({
  name: "socketIO",
  setup() {
    const labelCol = ref({ span: 4 });
    const wrapperCol = ref({ span: 14 });
    const form = ref({
      UserName: "",
      room: "",
      content: "",
      input: "",
    });

    let im = null;

    onMounted(() => {});

    const joinRoom = () => {
      new VueSocketIO({
        debug: true,
        connection: "http://localhost:3000",
        vuex: {},
      });
    };

    const handleSend = () => {};

    return {
      labelCol,
      wrapperCol,
      form,
      joinRoom,
      handleSend,
    };
  },
});
</script>
