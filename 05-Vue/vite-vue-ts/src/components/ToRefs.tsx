import { defineComponent, toRefs, reactive } from 'vue'

export default defineComponent({
  name: 'ToRefs',
  setup() {
    const state = reactive({
      age: 20,
      name: 'dd'
    })

    const stateAsRefs = toRefs(state) // 将响应式对象，变成普通对象

    const { age: ageRef, name: nameRef } = stateAsRefs // 每个属性，都是 ref 对象

    setTimeout(() => {
      state.age = 25
      state.name = 'dd-a'
    }, 1500)

    return () => (
      <p>
        toRefs demo {ageRef.value} {nameRef.value}
      </p>
    )
  }
})
