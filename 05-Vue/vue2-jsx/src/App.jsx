import styles from './App.module.css';

export default {
  name: 'App',

  render() {
    return (
      <div id={styles.app}>
        <div id='nav'>
          <router-link to='/'>Home</router-link> |
          <router-link to='/about'>About</router-link>
        </div>
        <router-view />
      </div>
    );
  }
};
