import {
  VNode,
  VNodeProps,
  createVNode,
  VNodeArrayChildren,
  Fragment,
  Text,
  Comment,
  isVNode
} from './vnode'
import { Teleport, TeleportProps } from './components/Teleport'
import { Suspense, SuspenseProps } from './components/Suspense'
import { isObject, isArray } from '@vue/shared'
import { RawSlots } from './componentSlots'
import {
  FunctionalComponent,
  Component,
  ComponentOptions,
  ConcreteComponent
} from './component'
import { EmitsOptions } from './componentEmits'
import { DefineComponent } from './apiDefineComponent'

// `h` is a more user-friendly version of `createVNode` that allows omitting the
// props when possible. It is intended for manually written render functions.
// Compiler-generated code uses `createVNode` because
// 1. it is monomorphic and avoids the extra call overhead
// 2. it allows specifying patchFlags for optimization

/*
// type only
h('div')

// type + props
h('div', {})

// type + omit props + children
// Omit props does NOT support named slots
h('div', []) // array
h('div', 'foo') // text
h('div', h('br')) // vnode
h(Component, () => {}) // default slot

// type + props + children
h('div', {}, []) // array
h('div', {}, 'foo') // text
h('div', {}, h('br')) // vnode
h(Component, {}, () => {}) // default slot
h(Component, {}, {}) // named slots

// named slots without props requires explicit `null` to avoid ambiguity
h(Component, null, {})
**/

type RawProps = VNodeProps & {
  // used to differ from a single VNode object as children
  __v_isVNode?: never
  // used to differ from Array children
  [Symbol.iterator]?: never
} & Record<string, any>

type RawChildren =
  | string
  | number
  | boolean
  | VNode
  | VNodeArrayChildren
  | (() => any)

// fake constructor type returned from `defineComponent`
interface Constructor<P = any> {
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): { $props: P }
}

// The following is a series of overloads for providing props validation of
// manually written render functions.

// element
export function h(type: string, children?: RawChildren): VNode
export function h(
  type: string,
  props?: RawProps | null,
  children?: RawChildren | RawSlots
): VNode

// text/comment
export function h(
  type: typeof Text | typeof Comment,
  children?: string | number | boolean
): VNode
export function h(
  type: typeof Text | typeof Comment,
  props?: null,
  children?: string | number | boolean
): VNode
// fragment
export function h(type: typeof Fragment, children?: VNodeArrayChildren): VNode
export function h(
  type: typeof Fragment,
  props?: RawProps | null,
  children?: VNodeArrayChildren
): VNode

// teleport (target prop is required)
export function h(
  type: typeof Teleport,
  props: RawProps & TeleportProps,
  children: RawChildren | RawSlots
): VNode

// suspense
export function h(type: typeof Suspense, children?: RawChildren): VNode
export function h(
  type: typeof Suspense,
  props?: (RawProps & SuspenseProps) | null,
  children?: RawChildren | RawSlots
): VNode

// functional component
export function h<
  P,
  E extends EmitsOptions = {},
  S extends Record<string, any> = {}
>(
  type: FunctionalComponent<P, E, S>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  children?: RawChildren | RawSlots
): VNode

// catch-all for generic component types
export function h(type: Component, children?: RawChildren): VNode

// concrete component
export function h<P>(
  type: ConcreteComponent | string,
  children?: RawChildren
): VNode
export function h<P>(
  type: ConcreteComponent<P> | string,
  props?: (RawProps & P) | ({} extends P ? null : never),
  children?: RawChildren
): VNode

// component without props
export function h<P>(
  type: Component<P>,
  props?: (RawProps & P) | null,
  children?: RawChildren | RawSlots
): VNode

// exclude `defineComponent` constructors
export function h<P>(
  type: ComponentOptions<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  children?: RawChildren | RawSlots
): VNode

// fake constructor type returned by `defineComponent` or class component
export function h(type: Constructor, children?: RawChildren): VNode
export function h<P>(
  type: Constructor<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  children?: RawChildren | RawSlots
): VNode

// fake constructor type returned by `defineComponent`
export function h(type: DefineComponent, children?: RawChildren): VNode
export function h<P>(
  type: DefineComponent<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  children?: RawChildren | RawSlots
): VNode

// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  // 获取用户传递的参数个数
  const argCount = arguments.length

  // 如果只有两个参数，则第二个参数可能是 props 或者 children
  if (argCount === 2) {
    // 第二个参数是对象，但不是数组，代表它是一个 VNode 或者普通的 props
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // 如果是 VNode，则第二个参数代表 children
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // 如果不是 VNode，代表这是 props 参数
      return createVNode(type, propsOrChildren)
    }
    // 如果第二个参数不是单纯的 object，则代表这就是 props 参数
    else {
      return createVNode(type, null, propsOrChildren)
    }
  }
  // 如果有三个参数或更多，则第二个参数一定代表 props 参数
  else {
    // 如果参数数量超过三个，则从第二个参数开始，把所有后续参数都作为 children
    if (argCount > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    }
    // 如果只有三个参数，且最后一个参数是 VNode，则它只是一个单纯的 children 参数
    else if (argCount === 3 && isVNode(children)) {
      children = [children]
    }
    // 通过传递的参数，创建 VNode 实例
    return createVNode(type, propsOrChildren, children)
  }
}
