import type { ActionContext } from 'vuex'
import { GET_DATA } from './constant'
import type { userStateType } from './store'

export default {
  [GET_DATA]({ commit }: ActionContext<userStateType, unknown>): void {
    console.log('action执行成功')
    setTimeout(() => {
      commit(GET_DATA, false)
    }, 2000)
  },
}
