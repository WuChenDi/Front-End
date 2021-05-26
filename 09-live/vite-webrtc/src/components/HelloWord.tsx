import { defineComponent, ref } from 'vue';

const HelloWord = defineComponent({
  name: 'HelloWord',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    console.log(props);

    const count = ref<number>(0);

    return () => (
      <>
        <h1>{props.msg}</h1>
        <button
          onClick={() => {
            count.value++;
          }}
        >
          count is: {count.value}
        </button>
      </>
    );
  },
});

export default HelloWord;
