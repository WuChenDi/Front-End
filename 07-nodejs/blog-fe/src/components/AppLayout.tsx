import React, { Component } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import LeftBar from "./LeftBar";
import SubTitle from "./SubTitle";
import { AdminStore } from "../store/AdminStore";
import { inject, observer } from "mobx-react";
import "../static/css/header.css";

const { Header, Content } = Layout;

interface IProps {
	adminStore?: AdminStore;
}

@inject("adminStore")
@observer
class AppLayout extends Component<IProps> {
	logout = () => {
		this.props.adminStore?.logout();
		window.location.href = "/login";
	};

	render() {
		return (
			<Layout>
				<Header className="header">
					<div className="logo" />
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key="1" onClick={this.logout}>
									退出
								</Menu.Item>
							</Menu>
						}
						className={"admin"}
					>
						<div>
							<Avatar src={this.props.adminStore?.admin?.avatar} />

							<span className={"admin-name"}>
								{this.props.adminStore?.admin.name}
							</span>
							<DownOutlined />
						</div>
					</Dropdown>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Layout>
					<LeftBar />
					<Layout style={{ padding: "0 24px 24px" }}>
						<SubTitle />
						<Content
							className="site-layout-background"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							{this.props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default AppLayout;
