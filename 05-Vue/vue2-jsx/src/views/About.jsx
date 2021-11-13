import Button from '@/components/button';
import HelloWorld from '@/components/HelloWorld';
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
              <p>scopedSlots即作用域插槽</p>
              {/* <pre>
                  <div
                    {...{
                      scopedSlots: {
                        default: () => {},
                        header: () => {}
                      }
                    }}
                  >
                    123
                  </div>
              </pre> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
