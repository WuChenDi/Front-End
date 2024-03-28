import { defineComponent, ref, onMounted, toRaw, nextTick } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute } from 'vue-router';
import { Layout, Menu } from 'ant-design-vue';
import './App.scss';

const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

interface MenuItem {
  index: string;
  title: string;
  subs?: Array<MenuItem>;
}

const App = defineComponent({
  name: 'App',
  setup() {
    const menuItem = ref<MenuItem[]>([
      {
        index: '/getUserMedia',
        title: '获取设备',
      },
      {
        index: '/mediaDevices',
        title: '音视频数据采集',
      },
      {
        index: '/3',
        title: '录制实战',
        subs: [
          { index: '/3/mediaRecoder', title: '录制音视频' },
          { index: '/3/getDisplayMedia', title: '屏幕捕获' },
        ],
      },
      {
        index: '/socketIO',
        title: '信令-socketIO',
      },
      {
        index: '/RTCPeerConnection',
        title: '端对端1V1传输',
      },
    ]);
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const route = useRoute() as RouteLocationNormalizedLoaded

    onMounted(() => {
      nextTick(() => {
        const { path } = toRaw(route);

        setTimeout(() => {
          const result = menuItem.value.filter((i) => path.includes(i.index));
          if (result[0]?.subs?.length) {
            const _subs = result[0].subs.filter((i) => path.includes(i.index));
            selectedKeys.value.push(_subs[0].index);
            openKeys.value.push(result[0].index);
          } else {
            selectedKeys.value.push(result?.[0]?.index);
            openKeys.value.length = 0;
          }
        }, 150);
      });
    });

    const ItemNode = (index: string, title: string) => {
      return (
        <Item key={index}>
          <router-link to={index}>{title}</router-link>
        </Item>
      );
    };

    return () => (
      <Layout id="components-layout">
        <Sider class="sider">
          <div class="logo">WebRTC</div>
          <Menu
            theme="dark"
            mode="inline"
            v-models={[
              [openKeys.value, 'openKeys'],
              [selectedKeys.value, 'selectedKeys'],
            ]}
          >
            {menuItem.value?.map((v) => {
              return v.subs ? (
                <>
                  <SubMenu
                    key={v.index}
                    v-slots={{
                      title: () => <span>{v.title}</span>,
                    }}
                  >
                    {v.subs.map((t) => ItemNode(t.index, t.title))}
                  </SubMenu>
                </>
              ) : (
                ItemNode(v.index, v.title)
              );
            })}
          </Menu>
        </Sider>
        <Layout class="layout-wrap">
          <Content class="layout-content">
            <div class="layout-content-div">
              <router-view />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  },
});
export default App;
