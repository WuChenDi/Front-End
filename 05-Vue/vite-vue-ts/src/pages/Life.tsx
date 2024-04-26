import { defineComponent, ref } from 'vue'
import LifeCycles2 from '@/components/LifeCycles2.vue'
import LifeCycles from '@/components/LifeCycles'

export default defineComponent({
  name: 'Life',
  setup() {
    const msgRef = ref('Hello Vue 3.0 + Vite')
    const flagRef = ref(true)

    const handleClick = () => {
      msgRef.value = `vue3 ${+new Date()}`
    }

    const handleChangeFlag = () => {
      flagRef.value = !flagRef.value
    }

    return () => (
      <>
        <div>
          <p>Life</p>

          {flagRef.value && <LifeCycles2 msg={msgRef.value} />}
          {flagRef.value && <LifeCycles msg={msgRef.value} />}
        </div>

        <button onClick={handleClick}>change msg</button>
        <button onClick={handleChangeFlag}>change flag</button>
      </>
    )
  },
})
