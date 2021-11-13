export default {
  name: 'MyScoped',
  data() {
    return {
      user: {
        name: 'Vue + JSX'
      }
    };
  },
  render() {
    return (
      <div>
        <p>MyScoped 自定义组件</p>
        {this.$slots.header}
        {this.$slots.content}
        {this.$scopedSlots.test({
          user: this.user
        })}
        {this.$slots.footer}
      </div>
    );
  }
};
