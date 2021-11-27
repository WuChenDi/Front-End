import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Ref',
  setup() {
    const ageRef = ref(20) // 值类型 响应式
    const nameRef = ref('dd')

    const state = reactive({
      name: nameRef
    })

    setTimeout(() => {
      console.log('ageRef', ageRef.value)

      ageRef.value = 18 // .value 修改值
      nameRef.value = 'dd-a'
    }, 1500)

    return () => (
      <p>
        ref demo {ageRef.value} {state.name}
      </p>
    )
  }
})
