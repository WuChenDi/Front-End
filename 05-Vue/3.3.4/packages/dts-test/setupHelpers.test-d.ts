import {
  defineProps,
  defineEmits,
  useAttrs,
  useSlots,
  withDefaults,
  Slots,
  defineSlots,
  VNode,
  Ref,
  defineModel
} from 'vue'
import { describe, expectType } from './utils'
import { defineComponent } from 'vue'
import { useModel } from 'vue'

describe('defineProps w/ type declaration', () => {
  // type declaration
  const props = defineProps<{
    foo: string
    bool?: boolean
    boolAndUndefined: boolean | undefined
  }>()
  // explicitly declared type should be refined
  expectType<string>(props.foo)
  // @ts-expect-error
  props.bar

  expectType<boolean>(props.bool)
  expectType<boolean>(props.boolAndUndefined)
})

describe('defineProps w/ generics', () => {
  function test<T extends boolean>() {
    const props = defineProps<{ foo: T; bar: string; x?: boolean }>()
    expectType<T>(props.foo)
    expectType<string>(props.bar)
    expectType<boolean>(props.x)
  }
  test()
})

describe('defineProps w/ type declaration + withDefaults', () => {
  const res = withDefaults(
    defineProps<{
      number?: number
      arr?: string[]
      obj?: { x: number }
      fn?: (e: string) => void
      genStr?: string
      x?: string
      y?: string
      z?: string
      bool?: boolean
      boolAndUndefined: boolean | undefined
    }>(),
    {
      number: 123,
      arr: () => [],
      obj: () => ({ x: 123 }),
      fn: () => {},
      genStr: () => '',
      y: undefined,
      z: 'string'
    }
  )

  res.number + 1
  res.arr.push('hi')
  res.obj.x
  res.fn('hi')
  res.genStr.slice()
  // @ts-expect-error
  res.x.slice()
  // @ts-expect-error
  res.y.slice()

  expectType<string | undefined>(res.x)
  expectType<string | undefined>(res.y)
  expectType<string>(res.z)

  expectType<boolean>(res.bool)
  expectType<boolean>(res.boolAndUndefined)
})

describe('defineProps w/ union type declaration + withDefaults', () => {
  withDefaults(
    defineProps<{
      union1?: number | number[] | { x: number }
      union2?: number | number[] | { x: number }
      union3?: number | number[] | { x: number }
      union4?: number | number[] | { x: number }
    }>(),
    {
      union1: 123,
      union2: () => [123],
      union3: () => ({ x: 123 }),
      union4: () => 123
    }
  )
})

describe('defineProps w/ generic type declaration + withDefaults', <T extends number, TA extends {
  a: string
}, TString extends string>() => {
  const res = withDefaults(
    defineProps<{
      n?: number
      bool?: boolean

      generic1?: T[] | { x: T }
      generic2?: { x: T }
      generic3?: TString
      generic4?: TA
    }>(),
    {
      n: 123,

      generic1: () => [123, 33] as T[],
      generic2: () => ({ x: 123 } as { x: T }),

      generic3: () => 'test' as TString,
      generic4: () => ({ a: 'test' } as TA)
    }
  )

  res.n + 1

  expectType<T[] | { x: T }>(res.generic1)
  expectType<{ x: T }>(res.generic2)
  expectType<TString>(res.generic3)
  expectType<TA>(res.generic4)

  expectType<boolean>(res.bool)
})

describe('defineProps w/ runtime declaration', () => {
  // runtime declaration
  const props = defineProps({
    foo: String,
    bar: {
      type: Number,
      default: 1
    },
    baz: {
      type: Array,
      required: true
    }
  })
  expectType<{
    foo?: string
    bar: number
    baz: unknown[]
  }>(props)

  props.foo && props.foo + 'bar'
  props.bar + 1
  // @ts-expect-error should be readonly
  props.bar++
  props.baz.push(1)

  const props2 = defineProps(['foo', 'bar'])
  props2.foo + props2.bar
  // @ts-expect-error
  props2.baz
})

describe('defineEmits w/ type declaration', () => {
  const emit = defineEmits<(e: 'change') => void>()
  emit('change')
  // @ts-expect-error
  emit()
  // @ts-expect-error
  emit('bar')

  type Emits = { (e: 'foo' | 'bar'): void; (e: 'baz', id: number): void }
  const emit2 = defineEmits<Emits>()

  emit2('foo')
  emit2('bar')
  emit2('baz', 123)
  // @ts-expect-error
  emit2('baz')
})

describe('defineEmits w/ alt type declaration', () => {
  const emit = defineEmits<{
    foo: [id: string]
    bar: any[]
    baz: []
  }>()

  emit('foo', 'hi')
  // @ts-expect-error
  emit('foo')

  emit('bar')
  emit('bar', 1, 2, 3)

  emit('baz')
  // @ts-expect-error
  emit('baz', 1)
})

describe('defineEmits w/ runtime declaration', () => {
  const emit = defineEmits({
    foo: () => {},
    bar: null
  })
  emit('foo')
  emit('bar', 123)
  // @ts-expect-error
  emit('baz')

  const emit2 = defineEmits(['foo', 'bar'])
  emit2('foo')
  emit2('bar', 123)
  // @ts-expect-error
  emit2('baz')
})

describe('defineSlots', () => {
  // literal fn syntax (allow for specifying return type)
  const fnSlots = defineSlots<{
    default(props: { foo: string; bar: number }): any
    optional?(props: string): any
  }>()
  expectType<(scope: { foo: string; bar: number }) => VNode[]>(fnSlots.default)
  expectType<undefined | ((scope: string) => VNode[])>(fnSlots.optional)

  const slotsUntype = defineSlots()
  expectType<Slots>(slotsUntype)
})

describe('defineModel', () => {
  // overload 1
  const modelValueRequired = defineModel<boolean>({ required: true })
  expectType<Ref<boolean>>(modelValueRequired)

  // overload 2
  const modelValue = defineModel<string>()
  expectType<Ref<string | undefined>>(modelValue)
  modelValue.value = 'new value'

  const modelValueDefault = defineModel<boolean>({ default: true })
  expectType<Ref<boolean>>(modelValueDefault)

  // overload 3
  const countRequired = defineModel<number>('count', { required: false })
  expectType<Ref<number | undefined>>(countRequired)

  // overload 4
  const count = defineModel<number>('count')
  expectType<Ref<number | undefined>>(count)

  const countDefault = defineModel<number>('count', { default: 1 })
  expectType<Ref<number>>(countDefault)

  // infer type from default
  const inferred = defineModel({ default: 123 })
  expectType<Ref<number | undefined>>(inferred)
  const inferredRequired = defineModel({ default: 123, required: true })
  expectType<Ref<number>>(inferredRequired)

  // @ts-expect-error type / default mismatch
  defineModel<string>({ default: 123 })
  // @ts-expect-error unknown props option
  defineModel({ foo: 123 })

  // accept defineModel-only options
  defineModel({ local: true })
  defineModel('foo', { local: true })
})

describe('useModel', () => {
  defineComponent({
    props: ['foo'],
    setup(props) {
      const r = useModel(props, 'foo')
      expectType<Ref<any>>(r)

      // @ts-expect-error
      useModel(props, 'bar')
    }
  })

  defineComponent({
    props: {
      foo: String,
      bar: { type: Number, required: true },
      baz: { type: Boolean }
    },
    setup(props) {
      expectType<Ref<string | undefined>>(useModel(props, 'foo'))
      expectType<Ref<number>>(useModel(props, 'bar'))
      expectType<Ref<boolean>>(useModel(props, 'baz'))
    }
  })
})

describe('useAttrs', () => {
  const attrs = useAttrs()
  expectType<Record<string, unknown>>(attrs)
})

describe('useSlots', () => {
  const slots = useSlots()
  expectType<Slots>(slots)
})
