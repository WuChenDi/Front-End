import { defineComponent, ref } from "vue";
import Header from "../Header/index";
import UnDoList from "../UnDoList/index";
import { UnDoListType, UnDoChangeParameter } from "@/utils/types";

export default defineComponent({
  name: "ToDoList",
  setup() {
    const undoListRef = ref<UnDoListType[]>([]);

    const addUnDoItem = (inputValue: string) => {
      console.log(inputValue);
      undoListRef.value.push({
        status: "div",
        value: inputValue,
      });
      console.log(undoListRef.value);
    };

    const handleItemDelete = (index: number) => {
      undoListRef.value.splice(index, 1);
      console.log(undoListRef.value);
    };

    const changeStatus = (index: number) => {
      const newList: UnDoListType[] = [];
      undoListRef.value.forEach((item, itemIndex) => {
        newList.push({
          status: itemIndex === index ? "input" : "div",
          value: item.value,
        });
      });
      undoListRef.value = newList;
    };

    const resetStatus = () => {
      const newList: UnDoListType[] = [];
      undoListRef.value.forEach((item) => {
        newList.push({
          status: "div",
          value: item.value,
        });
      });
      undoListRef.value = newList;
    };

    const changeItemValue = ({ value, index }: UnDoChangeParameter) => {
      undoListRef.value[index].value = value;
    };

    return () => {
      const undoList = undoListRef.value;

      return (
        <div class="hello">
          <Header add={(e) => addUnDoItem(e)} />
          <UnDoList
            list={undoList}
            delete={handleItemDelete}
            status={changeStatus}
            reset={resetStatus}
            change={changeItemValue}
          />
        </div>
      );
    };
  },
});
