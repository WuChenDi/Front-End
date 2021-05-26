import { defineComponent, ref, onMounted, toRaw, nextTick, Slot, Slots } from 'vue';
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

const TitleSlots = defineComponent({
  setup(props, ctx) {
    return () => <>{ctx.slots.title && ctx.slots.title('TitleSlots')}</>;
  },
});

const App = defineComponent({
  name: 'App',

  setup() {
    const menuItem = ref<MenuItem[]>([]);
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const route = useRoute();

    onMounted(() => {
      const item: MenuItem[] = [
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
      ];
      menuItem.value = item;

      nextTick(() => {
        const { path } = toRaw(route) as any;

        setTimeout(() => {
          const result = item.filter((i) => path.value.includes(i.index));
          if (result[0]?.subs?.length) {
            const _subs = result[0].subs.filter((i) => path.value.includes(i.index));
            selectedKeys.value.push(_subs[0].index);
            openKeys.value.push(result[0].index);
          } else {
            selectedKeys.value.push(result?.[0]?.index);
            openKeys.value.length = 0;
          }
        }, 150);
      });
    });

    return () => (
      <Layout id="components-layout">
        <Sider class="sider">
          <div class="logo">WebRTC</div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            // v-model:selectedKeys={selectedKeys}
            // v-model={openKeys}
          >
            {menuItem.value?.map((v) => {
              return v.subs ? (
                <>
                  <TitleSlots v-slots={{ title: (n: string) => <span>{n}</span> }} />
                  <SubMenu key={v.index}>
                    {v.subs.map((t) => (
                      <Item key={t.index}>
                        <router-link to={t.index}>{t.title}</router-link>
                      </Item>
                    ))}
                  </SubMenu>
                </>
              ) : (
                <Item key={v.index}>
                  <router-link to={v.index}>{v.title}</router-link>
                </Item>
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
