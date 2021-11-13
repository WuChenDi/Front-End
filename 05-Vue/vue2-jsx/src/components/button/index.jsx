import Vue from 'vue';
import styles from './index.module.less';

export default Vue.extend({
  name: 'Button',
  props: {
    type: String,
    loading: Boolean,
    disabled: Boolean,
    circle: Boolean,
    block: Boolean
  },
  methods: {
    handleClick(event) {
      if (this.loading) {
        event.preventDefault();
      } else if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  },
  render() {
    const { type, loading, disabled, circle, block, $slots, handleClick } =
      this;

    const defaultSlots = () => {
      return (
        $slots?.default && (
          <span class={loading ? styles['button--loading-text'] : null}>
            {$slots.default}
          </span>
        )
      );
    };

    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        type={'button'}
        class={[
          styles['btn'],
          styles['button'],
          type ? styles[`button--${type}`] : '',
          disabled ? styles['is-disabled'] : '',
          loading ? styles['is-loading'] : '',
          circle ? styles['is-circle'] : '',
          block ? styles['is-block'] : ''
        ]}
      >
        {defaultSlots()}
      </button>
    );
  }
});
