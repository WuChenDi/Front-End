import { createStore } from './store'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = createStore()

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
