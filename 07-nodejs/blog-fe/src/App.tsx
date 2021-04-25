import React, { Component } from "react";

import View from "./components/View";
import { inject, observer } from "mobx-react";
import { AdminStore } from "./store/AdminStore";

interface IProps {
	adminStore?: AdminStore;
}

@inject("adminStore")
@observer
class App extends Component<IProps> {
	componentDidMount() {
		this.props.adminStore?.initAdmin();
	}

	render() {
		return (
			<>
				<View />
			</>
		);
	}
}

export default App;
