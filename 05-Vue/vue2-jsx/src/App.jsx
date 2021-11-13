import styles from './App.module.css';

export default {
  name: 'App',

  render() {
    return (
      <div id={styles.app}>
        <div id='nav'>
          <router-link to='/'>指令</router-link> |
          <router-link to='/about'>插槽</router-link> |
          <router-link to='/fn'>函数式组件</router-link>
        </div>
        <router-view />
      </div>
    );
  }
};
