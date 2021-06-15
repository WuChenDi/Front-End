import { GET_DATA } from "./constant";
import { userState } from "./store";

const mutations = {
  [GET_DATA](state: userState, payload: boolean): void {
    console.log("mutations 执行成功", payload);
    state.loading = payload;
  },
};

export default mutations;
