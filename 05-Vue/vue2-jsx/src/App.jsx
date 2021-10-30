import HelloWorld from './components/HelloWorld'
import logo from './assets/logo.png'
import styles from './App.module.css'

const App = {
  name: 'App',
  components: {
    HelloWorld
  },

  render() {
    return (
      <div id={styles.app}>
        <img src={logo} alt='' />
        <HelloWorld msg='Welcome to Your Vue.js App' />
      </div>
    )
  }
}

export default App
