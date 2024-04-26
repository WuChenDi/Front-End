import type { Ref } from 'vue'
import { customRef, defineComponent } from 'vue'

function useDebouncedRef<T>(value: T, delay = 200): Ref<T> {
  let timeout: ReturnType<typeof setTimeout>
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export default defineComponent({
  name: 'Modifier',
  setup() {
    const text = useDebouncedRef('hello', 1000)

    return () => (
      <>
        <p>This text only updates 1 second after you've stopped typing:</p>
        <p>{text.value}</p>
        <input v-model={text.value} />
      </>
    )
  },
})
