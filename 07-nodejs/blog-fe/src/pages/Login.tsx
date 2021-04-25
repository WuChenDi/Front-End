import React, { Component, createRef, RefObject, FC, memo } from "react";
import { Button, Form, FormInstance, Input, message, Space } from "antd";
import "../static/css/login.css";
import { login } from "../utils/api";
import { AdminStore } from "../store/AdminStore";
import { inject, observer } from "mobx-react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

interface IProps extends RouteComponentProps {
	adminStore?: AdminStore;
}

@inject("adminStore")
@observer
class Login extends Component<IProps> {
	formRef: RefObject<FormInstance>;

	constructor(props: any, context: any) {
		super(props, context);
		this.formRef = createRef<FormInstance>();
	}

	login = (form: any) => {
		login(form.name, form.password).then((response) => {
			const { code, msg, data } = response.data;
			if (code === 0) {
				this.props.adminStore?.login(data.token);
				this.props.adminStore?.initAdmin();
				this.props.history.push("/");
				message.success(msg);
			} else {
				message.error(msg);
			}
		});
	};

	render() {
		return (
			<div id="login">
				<Form
					id="login-form"
					{...layout}
					ref={this.formRef}
					onFinish={this.login}
				>
					<Form.Item
						label="用户名"
						name="name"
						rules={[{ type: "string", required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="用户名"
						name="password"
						rules={[{ type: "string", required: true }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Button type="primary" htmlType="reset">
								重置
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

// const Login: FC = memo(() => {});

export default withRouter(Login);
