import { userState } from "./modules/user/store";
import { createStore } from "vuex";
import { modules } from "./modules";

type State = {
  user: userState;
};

const store = createStore<State>({
  modules,
});

export { State };
export default store;
