import { createStore } from "./store";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = createStore();

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
