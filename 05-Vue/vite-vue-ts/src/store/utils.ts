import type { modules } from './modules'

/* 获取到 getters 结构类型 */
// 匹配到 单个module 下的 getter，小技巧 infer 为某一项
type GetGetter<GetterType> = GetterType extends { getters: infer G } ? G : unknown
// 获取 vuex 所有的 getters 模块
type GetGetters<GetterTypes> = {
  [K in keyof GetterTypes]: GetGetter<GetterTypes[K]>
}
type ModuleGetters = GetGetters<typeof modules>

// --------------------

/* 获取到 mutations 结构类型 */
// 配到 单个 module 下的 mutations
type GetMutation<MutationType> = MutationType extends { mutations: infer M } ? M : unknown
// 获取 vuex 所有的 mutations 模块
type GetMutations<MutationTypes> = {
  [K in keyof MutationTypes]: GetMutation<MutationTypes[K]>
}
type ModuleMutations = GetMutations<typeof modules>

// --------------------

/* 获取到 actions 结构类型 */
// 配到 单个 module 下的 action
type GetAction<ActionType> = ActionType extends { actions: infer A } ? A : unknown
// 获取 vuex 所有的 actions 模块
type GetActions<ActionTypes> = {
  [K in keyof ActionTypes]: GetAction<ActionTypes[K]>
}
type ModuleActions = GetActions<typeof modules>

// --------------------

/* Getter/Commit/Dispatch 智能提示处理 */
// gettters[模块名/方法]、commit[模块名/方法]、dispatch[模块名/方法]
// 传入的是 keyof 有可能是 symbol | number,所以 Prefix & string 取其中的string
type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`

// 调换一下顺序：user: "user/isLogin" => "user/isLogin": user
type GetSpliceKey<P, Module> = AddPrefix<P, keyof Module>

type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<K, Modules[K]>
}[keyof Modules]
// type xx = GetSpliceKeys<ModuleGetters>

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]
type GetSpliceObj<T> = {
  // K extends `${infer A}/${infer B}`相当于  user/isLogin  A=>user B=>isLogin
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}

// --------------------

/* Getters/Mutations/Actons 拼接好 xxx/xxx 的格式  */
type GenGetters = GetSpliceObj<ModuleGetters>
type Getters = {
  [K in keyof GenGetters]: ReturnType<GenGetters[K]>
}

// --------------------

type GenMutations = GetSpliceObj<ModuleMutations>
type Mutations = {
  [K in keyof GenMutations]: ReturnType<GenMutations[K]>
}

// --------------------

type GenActions = GetSpliceObj<ModuleActions>
type Actions = {
  [K in keyof GenActions]: ReturnType<GenActions[K]>
}

// --------------------

// commit 获取 payload 参数类型
type MutationsPayload = {
  // Parameters 获取函数参数
  [K in keyof GenMutations]: Parameters<GenMutations[K]>[1]
}

interface GetCommit<T> {
  // 可选参数类型，会自动加上undefined
  <K extends keyof T>(mutation: K, payload?: T[K]): void
}

type Commit = GetCommit<MutationsPayload>

// --------------------

// dispatch 获取 payload 参数类型
type ActionPayload = {
  // Parameters 获取函数参数
  [K in keyof GenActions]: Parameters<GenActions[K]>[1]
}
interface GetDispatch<T> {
  // 可选参数类型，会自动加上undefined
  <K extends keyof T>(action: K, payload?: T[K]): Promise<unknown>
}

type Dispatch = GetDispatch<ActionPayload>

// --------------------

export type { Getters, Mutations, Actions, Dispatch, Commit }
