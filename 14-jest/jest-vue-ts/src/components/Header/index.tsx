import { defineComponent, ref } from "vue";
import { HeaderPropsDefine } from "@/utils/types";
import "./index.scss";

export default defineComponent({
  name: "Header",
  props: HeaderPropsDefine,
  setup(props) {
    const inputValueRef = ref<string>("");

    const addToDoItem = () => {
      props?.add(inputValueRef.value);
      inputValueRef.value = "";
    };

    return () => {
      const inputValue = inputValueRef.value;

      return (
        <div class="header">
          <span>ToDoList</span>
          <input
            class="header-input"
            data-test="input"
            v-model={inputValue}
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
