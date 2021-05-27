import { defineComponent, ref } from 'vue'

const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true
  }
}

export default defineComponent({
  props: PropsType,

  setup(props) {
    const { msg, age } = props

    return () => (
      <div class='hello'>
        <h1>{msg}</h1>
        <h1>{age}</h1>
      </div>
    )
  }
})
