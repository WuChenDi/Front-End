/* eslint-disable no-console */
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'

const PropsType = {
  msg: String,
} as const

export default defineComponent({
  name: 'LifeCycles',
  props: PropsType,
  // 等于 beforeCreate 和 created
  setup(props) {
    console.log('setup')

    onBeforeMount(() => {
      console.log('Composition API ------ onBeforeMount')
    })
    onMounted(() => {
      console.log('Composition API ------ onMounted')
    })
    onBeforeUpdate(() => {
      console.log('Composition API ------ onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('Composition API ------ onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('Composition API ------ onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('Composition API ------ onUnmounted')
    })

    return () => <p>生命周期 Composition API ------ {props.msg}</p>
  },
})
