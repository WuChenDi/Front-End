/* eslint-disable no-console */
import { GET_DATA } from './constant'
import type { userStateType } from './store'

const mutations = {
  [GET_DATA](state: userStateType, payload: boolean): void {
    console.log('mutations 执行成功', payload)
    state.loading = payload
  },
}

export default mutations
