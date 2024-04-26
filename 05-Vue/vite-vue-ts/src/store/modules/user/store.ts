export const createStore = () => {
  const store = {
    loading: true,
  }
  return store
}

// 类型推导
export type userStateType = ReturnType<typeof createStore>
