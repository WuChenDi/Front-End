import FunComponent from '@/components/FunComponent';
import HelloWorld from '@/components/HelloWorld';

import logo from '../assets/logo.png';
import styles from './Home.module.less';

export default {
  name: 'Fn',

  render() {
    return (
      <div class={styles.about}>
        <img src={logo} alt='' />
        <HelloWorld msg='Vue + JSX，函数式组件' />

        <div class={styles.content}>
          <div class={styles.card}>
            <div class={styles.card__header}>函数式组件</div>
            <div class={styles.card__body}>
              <FunComponent message='Vue + JSX，函数式组件' />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
