import { useStore } from "vuex";
import { State } from "../store";
import { Getters } from "../store/utils";

interface IUserStore {
  state: State;
  getters: Getters;
}

const useDDStore = (): IUserStore => {
  const { state, getters }: IUserStore = useStore<State>();
  return { state, getters };
};

export { useDDStore };
export default useDDStore;
