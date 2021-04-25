import UserStore from "./UserStore";
import { AdminStore } from "./AdminStore";

export default {
	userStore: new UserStore(),
	adminStore: new AdminStore(),
};
