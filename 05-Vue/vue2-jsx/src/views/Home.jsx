import HelloWorld from '@/components/HelloWorld.jsx';
import logo from '../assets/logo.png';
import styles from './Home.module.css';

export default {
  name: 'Home',

  render() {
    return (
      <div class={styles.home}>
        <img src={logo} alt='' />
        <HelloWorld msg='Welcome to Your Vue.js App' />
      </div>
    );
  }
};
