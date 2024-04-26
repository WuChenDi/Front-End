/* eslint-disable no-console */
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'Modifier',
  setup() {
    const msgLazyRef = ref('Hello Vue 3.0 + Vite')
    const msgNumberRef = ref(123)
    const msgTrimRef = ref('Hello Vue 3.0 + Vite')

    watch(msgLazyRef, (newMsgLazyRef, oldMsgLazyRef) => {
      console.log(newMsgLazyRef, oldMsgLazyRef)
    })
    watch(msgNumberRef, (newMsgNumberRef, oldMsgNumberRef) => {
      console.log(newMsgNumberRef, oldMsgNumberRef)
    })
    watch(msgTrimRef, (newMsgTrimRef, oldMsgTrimRef) => {
      console.log(newMsgTrimRef, oldMsgTrimRef)
    })

    // watch([() => msgLazyRef, msgNumberRef, msgTrimRef], ([newMsgLazyRef, newMsgNumberRef, newMsgTrimRef], [oldMsgLazyRef, oldMsgNumberRef, oldMsgTrimRef]) => {
    //   console.log(newMsgLazyRef, oldMsgLazyRef);
    //   console.log(newMsgNumberRef, oldMsgNumberRef);
    //   console.log(newMsgTrimRef, oldMsgTrimRef);
    // })

    return () => (
      <>
        <div>
          <p>Modifier</p>
        </div>

        <p>v-models.lazy: {msgLazyRef.value}</p>
        {/* <input v-model:lazy={msgRef.value} /> */}
        <input v-model={[msgLazyRef.value, ['lazy']]} />

        <p>v-models.number: {msgNumberRef.value}</p>
        <input v-model={[msgNumberRef.value, ['number']]} />

        <p>v-models.trim: {msgTrimRef.value}</p>
        <input v-model={[msgTrimRef.value, ['trim']]} />
      </>
    )
  },
})
