import {defineComponent, PropType} from 'vue'
import {Schema, SchemaTypes} from './types'


export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    }
  },
  name: 'SchemaForm',
  setup(props, {slots, emit, attrs}) {
    return () => {
      const schema = props.schema
      const type = schema?.type
      switch (type) {
        case SchemaTypes.STRING: {
          return <input type="text"/>
        }
      }
      return <div>SchemaForm</div>
    }
  },
})
