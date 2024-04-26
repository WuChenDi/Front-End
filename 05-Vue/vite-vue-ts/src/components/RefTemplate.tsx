/* eslint-disable no-console */
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'RefTemplate',
  setup() {
    const elemRef = ref()

    onMounted(() => {
      console.log('ref template', elemRef.value, elemRef.value.innerHTML)
    })

    return () => <p ref={elemRef}>我是一 p 标签</p>
  },
})
