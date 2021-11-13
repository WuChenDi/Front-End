import Button from '@/components/button';
import HelloWorld from '@/components/HelloWorld';
import MyScoped from '@/components/MyScoped';

import logo from '../assets/logo.png';
import styles from './Home.module.less';

export default {
  name: 'About',

  render() {
    return (
      <div class={styles.about}>
        <img src={logo} alt='' />
        <HelloWorld msg='Vue + JSX，插槽' />

        <div class={styles.content}>
          <div class={styles.card}>
            <div class={styles.card__header}>默认插槽</div>
            <div class={styles.card__body}>
              <Button>默认插槽</Button>
              <Button>{JSON.stringify(this.$slots)}</Button>

              <p>this.$slots 挂载组件内部的所有插槽</p>
              <p>default: 默认插槽</p>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>具名插槽 作用域插槽</div>
            <div class={styles.card__body}>
              <p>scopedSlots</p>

              <MyScoped
                {...{
                  scopedSlots: {
                    test: ({ user }) => <div>{user.name}</div>
                  }
                }}
              >
                <header slot='header'>header</header>
                <header slot='content'>content</header>
                <footer slot='footer'>footer</footer>
              </MyScoped>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
