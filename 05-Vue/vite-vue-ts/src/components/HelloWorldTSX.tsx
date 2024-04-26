import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

const PropsType = {
  msg: String,
  onChange: {
    type: Function as PropType<(v: string) => void>,
    required: true,
  },
} as const

export default defineComponent({
  name: 'HelloWorldTsx',
  props: PropsType,
  setup(props) {
    const countRef = ref(0)

    const handleClick = () => {
      countRef.value++
      props.onChange('vue3')
    }

    return () => (
      <>
        <h1>{props.msg}</h1>
        <button onClick={handleClick}>count is: {countRef.value}</button>
      </>
    )
  },
})
