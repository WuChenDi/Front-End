import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VModelComponents',
  props: {
    name: String,
    age: [String, Number]
  },
  emits: ['update:name', 'update:age'],
  setup(props, { emit }) {
    const handleNameChange = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      emit('update:name', value)
    }
    const handleAgeChange = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      emit('update:age', value)
    }

    return () => {
      const { name, age } = props

      return (
        <>
          <input value={name} onInput={handleNameChange} />
          <input value={age} onInput={handleAgeChange} />
        </>
      )
    }
  }
})
