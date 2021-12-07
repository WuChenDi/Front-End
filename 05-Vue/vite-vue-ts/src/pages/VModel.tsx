import { defineComponent, reactive, toRefs } from 'vue'
import VModelComponents from '@/components/VModelComponents'

export default defineComponent({
  name: 'VModel',
  setup() {
    const state = reactive({
      name: 'dd',
      age: 20
    })

    const stateAsRefs = toRefs(state)

    const { age: ageRef, name: nameRef } = stateAsRefs

    return () => (
      <>
        <p>
          v-models name: {nameRef.value} age: {ageRef.value}
        </p>

        <VModelComponents
          v-model:name={nameRef.value}
          v-model:age={ageRef.value}
        />
      </>
    )
  }
})
