import { Commit, Dispatch, useStore } from "vuex";
import { State } from "../store";
import { Getters } from "../store/utils";

interface IUserStore {
  state: State;
  getters: Getters;
  dispatch: Dispatch;
  commit: Commit;
}

const useDDStore = (): IUserStore => {
  const { state, getters, dispatch, commit }: IUserStore = useStore<State>();
  return { state, getters, dispatch, commit };
};

export { useDDStore };
export default useDDStore;
