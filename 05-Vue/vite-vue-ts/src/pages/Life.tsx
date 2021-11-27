import { defineComponent, ref } from 'vue'
import LifeCycles2 from '@/components/LifeCycles2.vue'
import LifeCycles from '@/components/LifeCycles'

export default defineComponent({
  name: 'Life',
  setup() {
    const msg = ref('Hello Vue 3.0 + Vite')
    const flag = ref(true)

    const handleClick = () => {
      msg.value = `vue3 ${+new Date()}`
    }

    const handleChangeFlag = () => {
      flag.value = !flag.value
    }

    return () => (
      <>
        <div>
          <p>Life</p>

          {flag.value && <LifeCycles2 msg={msg.value} />}
          {flag.value && <LifeCycles msg={msg.value} />}
        </div>

        <button onClick={handleClick}>change msg</button>
        <button onClick={handleChangeFlag}>change flag</button>
      </>
    )
  }
})
