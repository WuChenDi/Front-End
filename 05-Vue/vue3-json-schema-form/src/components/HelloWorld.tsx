import { defineComponent } from 'vue'

const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true
  }
} as const

export default defineComponent({
  props: PropsType,

  setup(props) {
    return () => (
      <div class='hello'>
        <h1>{props.msg}</h1>
        <h1>{props.age}</h1>
      </div>
    )
  }
})
