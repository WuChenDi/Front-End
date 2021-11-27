import { defineComponent, toRef, reactive, computed } from 'vue'

export default defineComponent({
  name: 'ToRef',
  setup() {
    const state = reactive({
      age: 18,
      name: 'dd'
    })

    const age1 = computed(() => {
      return state.age + 1
    })

    // // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
    // const state = {
    //   age: 18,
    //   name: 'dd'
    // }

    const ageRef = toRef(state, 'age')

    setTimeout(() => {
      state.age = 25
    }, 1500)

    setTimeout(() => {
      ageRef.value = 30 // .value 修改值
    }, 3000)

    return () => (
      <p>
        toRef demo - {ageRef.value} - {state.name} {state.age}
      </p>
    )
  }
})
