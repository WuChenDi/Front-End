import { defineComponent, ref } from "vue";
import { HeaderPropsDefine } from "../../utils/types";
import "./index.scss";

export default defineComponent({
  name: "Header",
  props: HeaderPropsDefine,
  setup(props) {
    const inputValue = ref<string>("");

    const addToDoItem = () => {
      props?.add(inputValue.value);
      inputValue.value = "";
    };

    return () => {
      return (
        <div class="header">
          <span>ToDoList</span>
          <input
            class="header-input"
            data-test="input"
            v-model={inputValue.value}
            onKeyup={(e: any) => {
              if (e.keyCode === 13 && inputValue) {
                addToDoItem();
              }
            }}
            placeholder="add ToDoItem"
          />
        </div>
      );
    };
  },
});
