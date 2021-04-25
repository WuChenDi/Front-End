import React, { ReactNode, lazy } from "react";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";

// const Dashboard = lazy(() => import("../pages/index/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Page404 = lazy(() => import("../pages/Page404"));
// const UserList = lazy(() => import("../pages/user/UserList"));
// const AdminList = lazy(() => import("../pages/admin/AdminList"));
// const RoleList = lazy(() => import("../pages/role/RoleList"));

export interface IRouter {
	title: string;
	path: string;
	key: string;
	exact?: boolean;
	icon?: ReactNode;
	component?: ReactNode;
	children?: IRouter[];
}

// export const leftRouter: IRouter[] = [
// 	{
// 		path: "/admin/dashboard",
// 		title: "仪表盘",
// 		icon: <DashboardOutlined />,
// 		key: "dashboard",
// 		component: <Dashboard />,
// 	},
// 	{
// 		path: "/admin/user",
// 		title: "用户管理",
// 		icon: <UserOutlined />,
// 		key: "user",
// 		children: [
// 			{
// 				path: "/admin/user/list",
// 				title: "用户列表",
// 				icon: <UserOutlined />,
// 				key: "userList",
// 				component: <UserList />,
// 			},
// 		],
// 	},
// 	{
// 		path: "/admin/admin",
// 		title: "管理员管理",
// 		icon: <UserOutlined />,
// 		key: "admin",
// 		children: [
// 			{
// 				path: "/admin/admin/list",
// 				title: "管理员列表",
// 				icon: <UserOutlined />,
// 				key: "adminList",
// 				component: <AdminList />,
// 			},
// 		],
// 	},
// 	{
// 		path: "/admin/role",
// 		title: "角色管理",
// 		icon: <UserOutlined />,
// 		key: "role",
// 		children: [
// 			{
// 				path: "/admin/role/list",
// 				title: "角色列表",
// 				icon: <UserOutlined />,
// 				key: "roleList",
// 				component: <RoleList />,
// 			},
// 		],
// 	},
// ];

export const leftRouter: IRouter[] = [];

const topRouter: IRouter[] = [];
const router: IRouter[] = [...leftRouter, ...topRouter];
export const unAuthRouter: IRouter[] = [
	{
		path: "/login",
		title: "登录",
		key: "login",
		component: <Login />,
	},
	{
		path: "*",
		title: "404",
		key: "404",
		exact: false,
		component: <Page404 />,
	},
];

export default router;
