import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
	return (
		<BrowserRouter basename="/react">
			<div className="nav">  
        <Link to="/">index</Link> |
        <Link to="/about">about</Link>
      </div>
			<Route
				path="/"
				exact
				render={() => (
					<div className="App">
						<header className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<p>
								Edit <code>src/App.js</code> and save to reload.
							</p>
							<a
								className="App-link"
								href="https://reactjs.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								Learn React
							</a>
						</header>
					</div>
				)}
			></Route>
			<Route path="/about" render={() => <h1>about</h1>}></Route>
		</BrowserRouter>
	);
}

export default App;
