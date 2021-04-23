import { Hooks } from "./hooks";
import { AttachData } from "./helpers/attachto";
import { VNodeStyle } from "./modules/style";
import { On } from "./modules/eventlisteners";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { Props } from "./modules/props";
import { Dataset } from "./modules/dataset";

export type Key = string | number | symbol;

export interface VNode {
  sel: string | undefined; // selector
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined; // 子节点
  elm: Node | undefined; // element, 存储 HTMLELement
  text: string | undefined; // 文本节点
  key: Key | undefined; // 节点 key
}

export interface VNodeData {
  props?: Props; // 节点属性
  attrs?: Attrs; // 节点 attribute 属性
  class?: Classes; // class 类名
  style?: VNodeStyle; // style 样式
  dataset?: Dataset; // html 自定义属性 data-
  on?: On; // 事件
  attachData?: AttachData;
  hook?: Hooks; // 钩子
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
