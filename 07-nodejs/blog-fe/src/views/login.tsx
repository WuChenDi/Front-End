import React, { FC, useContext } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getItem } from "../utils/localStorage";

const layout = {
	// labelCol: { span: 6 },
	wrapperCol: { span: 24 },
};

interface LoginProps {}

const Login: FC<LoginProps> = (props: {}) => {
	const { username = "", password = "" } = {};

	const onFinish = (values: any) => {
		console.log(values);
		const { username, password } = values;
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			<div>
				<p>欢迎使用～</p>
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						// label="用户名"
						name="username"
						initialValue={username}
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input
							size="large"
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="请输入用户名"
						/>
					</Form.Item>

					<Form.Item
						// label="密码"
						name="password"
						initialValue={password}
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password
							size="large"
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="请输入密码"
						/>
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked">
						<Checkbox>记住密码</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ span: 24 }}>
						<Button size="large" block type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
