import { action, makeAutoObservable, observable } from "mobx";
import { clear, set } from "../utils/storage";

interface IAdmin {
	id: number;
	name: string;
	avatar: string;
}

export class AdminStore {
	@observable
	public admin: IAdmin = { id: 0, name: "", avatar: "" };

	constructor(admin: IAdmin = { id: 0, name: "admin", avatar: "" }) {
		this.admin = admin;
		makeAutoObservable(this);
	}

	@action
	logout = () => {
		this.admin = { id: 0, name: "", avatar: "" };
		clear();
	};

	@action
	login = (token: string) => {
		set("token", token);
	};

	@action
	initAdmin = () => {};
}
