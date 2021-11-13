import HelloWorld from '@/components/HelloWorld';
import logo from '../assets/logo.png';
import styles from './Home.module.less';

export default {
  name: 'Home',
  data() {
    return {
      show: true,
      if_S: true,
      inputValue: '123',
      inputValueChange: '123',
      inputValueModel: '123',
      list: [1, 2, 3, 4, 5],
      html: '<p>Vue JSX</p>'
    };
  },
  methods: {
    handleShowChange(state) {
      this.show = state;
    },
    handleIfChange(state) {
      this.if_S = state;
    },
    handleClick(e) {
      console.log(e);
    }
  },

  render() {
    const {
      show,
      if_S,
      inputValue,
      inputValueChange,
      inputValueModel,
      list,
      html
    } = this;

    return (
      <div class={styles.home}>
        <img src={logo} alt='' />
        <HelloWorld msg='Vue + JSX' />

        <div class={styles.content}>
          <div class={styles.card}>
            <div class={styles.card__header}>v-show</div>
            <div class={styles.card__body}>
              <button onClick={() => this.handleShowChange(!show)}>
                change show
              </button>
              <div v-show={show}>v-show</div>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-if</div>
            <div class={styles.card__body}>
              v-if 使用三元表达式来当判断了
              <button onClick={() => this.handleIfChange(!if_S)}>
                change if
              </button>
              {if_S && <div>v-if</div>}
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-on</div>
            <div class={styles.card__body}>
              <button onClick={this.handleClick}>点击事件</button>
              <button on-click={this.handleClick}>点击事件</button>
              <p>nativeOnClick 原生点击事件 对应@click.native</p>
              <button onClick={e => this.handleClick(e)}>
                触发点击事件时，传递参数
              </button>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-bind</div>
            <div class={styles.card__body}>
              <input type='text' value={inputValue} />
              <p>value: {inputValue}</p>

              <input
                type='text'
                value={inputValueChange}
                onInput={e => (this.inputValueChange = e.target.value)}
              />
              <p>input change: {inputValueChange}</p>

              <input type='text' v-model={this.inputValueModel} />
              <p>v-model: {inputValueModel}</p>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-for</div>
            <div class={styles.card__body}>
              v-for 使用可使用 map 函数实现
              <ul>
                {list.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-text</div>
            <div class={styles.card__body}>
              v-text 使用 domPropsTextContent
              <div domPropsTextContent={html}></div>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-html</div>
            <div class={styles.card__body}>
              v-html 使用 domPropsInnerHTML
              <div domPropsInnerHTML={html}></div>
            </div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-pre</div>
            <div class={styles.card__body}>无替代方案</div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-cloak</div>
            <div class={styles.card__body}>无替代方案</div>
          </div>

          <div class={styles.card}>
            <div class={styles.card__header}>v-once</div>
            <div class={styles.card__body}>无替代方案</div>
          </div>
        </div>
      </div>
    );
  }
};
