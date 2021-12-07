import { defineComponent, ref } from 'vue'
import Watch from '@/components/Watch.vue'
import WatchEffect from '@/components/watchEffect.vue'

export default defineComponent({
  name: 'Watch',
  setup() {
    return () => (
      <>
        <p>Watch 与 WatchEffect 区别</p>
        <ul>
          <li>两者都可监听 data 属性变化</li>
          <li>watch 需要明确监听哪个属性</li>
          <li>watchEffect 会根据其中的属性，自动监听其变化</li>
          <li>watchEffect 初始化时，一定会执行一次, 主要是为了收集需要监听数据</li>
        </ul>

        <Watch />
        <WatchEffect />
      </>
    )
  }
})
