import HelloWorld from './components/HelloWorld'
import logo from './assets/logo.png'
import './App.css'

const App = {
	name: 'App',
	components: {
		HelloWorld,
	},

	render() {
		return (
			<div id='app'>
				<img src={logo} alt='' />
				<HelloWorld msg='Welcome to Your Vue.js App' />
			</div>
		)
	},
}

export default App
