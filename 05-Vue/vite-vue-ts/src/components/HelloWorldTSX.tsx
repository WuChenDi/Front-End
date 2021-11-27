import { defineComponent, ref, PropType } from 'vue'

const PropsType = {
  msg: String,
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const

export default defineComponent({
  name: 'HelloWorld-tsx',
  props: PropsType,
  setup(props) {
    const count = ref(0)

    const handleClick = () => {
      count.value++
      props.onChange('vue3')
    }

    return () => (
      <>
        <h1>{props.msg}</h1>
        <button onClick={handleClick}>count is: {count.value}</button>
      </>
    )
  }
})
