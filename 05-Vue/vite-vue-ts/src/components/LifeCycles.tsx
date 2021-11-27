import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

const PropsType = {
  msg: String
} as const

export default defineComponent({
  name: 'LifeCycles',
  props: PropsType,
  // 等于 beforeCreate 和 created
  setup(props) {
    console.log('setup')

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })

    return () => <p>生命周期 Composition API ------ {props.msg}</p>
  }
})
