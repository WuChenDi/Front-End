import './index.module.css';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  render() {
    const { msg } = this;

    return (
      <div class>
        <h1>{msg}</h1>
      </div>
    );
  }
};
