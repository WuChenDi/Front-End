import type { App } from "vue";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { userStateType } from "./modules/user/store";
import { modules } from "./modules";

type RootState = {
  user: userStateType;
};

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user"],
});

const store = createStore<RootState>({
  modules,
  plugins: [vuexLocal.plugin],
});

export function setupStore(app: App) {
  app.use(store);
}

export { RootState };
export default store;
