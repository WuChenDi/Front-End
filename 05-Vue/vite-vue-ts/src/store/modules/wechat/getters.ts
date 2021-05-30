import { userState } from "./store";

const moduleGetters = {
  isTest: (state: userState): number => {
    return 123;
  },
};

export default moduleGetters;
