import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();

    return () => (
      <>
        <h1>Home</h1>
        <h1>{store.state.title}</h1>
      </>
    );
  },
});
