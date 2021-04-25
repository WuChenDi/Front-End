import React, { Component, Fragment, ReactNode, Suspense } from "react";
import router, { IRouter, unAuthRouter } from "../router";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import AppLayout from "./AppLayout";

class View extends Component {
	generateRouter = (routerList?: IRouter[]): ReactNode => {
		return (
			<>
				{routerList?.map((r) => {
					if (r.children) {
						return (
							<Fragment key={r.key}>{this.generateRouter(r.children)}</Fragment>
						);
					}
					return (
						<Route key={r.key} exact={r.exact} path={r.path}>
							{r.component}
						</Route>
					);
				})}
			</>
		);
	};

	render() {
		return (
			<>
				<Suspense fallback={<></>}>
					<Router>
						<Switch>
							<Route path={"/"} exact>
								<Redirect to={"/admin/dashboard"} />
							</Route>
							<Route path="/admin">
								<AppLayout>
									<Suspense fallback={<></>}>
										{this.generateRouter(router)}
									</Suspense>
								</AppLayout>
							</Route>
							<Switch>
								{unAuthRouter.map((r) => (
									<Route key={r.key} exact={r.exact} path={r.path}>
										{r.component}
									</Route>
								))}
							</Switch>
						</Switch>
					</Router>
				</Suspense>
			</>
		);
	}
}

export default View;
