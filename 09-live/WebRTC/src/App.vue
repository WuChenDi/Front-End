<template>
  <a-layout id="components-layout">
    <a-layout-sider class="sider">
      <div class="logo">WebRTC</div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
        <template v-for="v in menuItem">
          <template v-if="v.subs">
            <a-sub-menu :key="v.index">
              <template #title>
                <span>{{ v.title }}</span>
              </template>
              <a-menu-item v-for="t in v.subs" :key="t.index">
                <router-link :to="t.index">{{ t.title }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="v.index">
              <router-link :to="v.index">{{ v.title }}</router-link>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-wrap">
      <a-layout-content class="layout-content">
        <div class="layout-content-div">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, nextTick } from "vue";
import { useRoute } from "vue-router";

interface MenuItem {
  index: string;
  title: string;
  subs?: Array<MenuItem>;
}

const menuItem = ref<MenuItem[]>([]);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const route = useRoute();

onMounted(() => {
  const item: MenuItem[] = [
    {
      index: "/getUserMedia",
      title: "获取设备",
    },
    {
      index: "/mediaDevices",
      title: "音视频数据采集",
    },
    {
      index: "/3",
      title: "录制实战",
      subs: [
        { index: "/3/mediaRecoder", title: "录制音视频" },
        { index: "/3/getDisplayMedia", title: "屏幕捕获" },
      ],
    },
    {
      index: "/socketIO",
      title: "信令-socketIO",
    },
    {
      index: "/RTCPeerConnection",
      title: "端对端1V1传输",
    },
  ];
  menuItem.value = item;

  nextTick(() => {
    const { path } = toRaw(route);

    setTimeout(() => {
      const result = item.filter((i) => path.includes(i.index));
      if (result[0].subs?.length) {
        const _subs = result[0].subs.filter((i) =>
          path.includes(i.index)
        );
        selectedKeys.value.push(_subs[0].index);
        openKeys.value.push(result[0].index);
      } else {
        selectedKeys.value.push(result[0].index);
        openKeys.value.length = 0;
      }
    }, 150);
  });
});

</script>

<style scoped lang="scss">
#components-layout {
  .sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 16px;
      font-size: 20px;
      cursor: pointer;
      color: #fff;
      background-color: #1890ff;
      border-color: #1890ff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      &:hover {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
      }
    }
  }
  .layout-wrap {
    margin-left: 200px;
    .layout-content {
      margin: 24px 16px 0;
      overflow: initial;
      &-div {
        padding: 24px;
        background: #fff;
        text-align: center;
      }
    }
  }
}

</style>
