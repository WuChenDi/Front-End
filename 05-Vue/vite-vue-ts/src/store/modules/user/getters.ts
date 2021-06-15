import { userState } from "./store";

const moduleGetters = {
  isLogin: (state: userState): string => {
    console.log("getters 执行成功");
    return `🏮${state.loading}`;
  },
};

export default moduleGetters;
