import { defineComponent, ref } from "vue";
import Header from "../Header/index";
import UnDoList from "../UnDoList/index";
import { UnDoListType } from "../../utils/types";

export default defineComponent({
  name: "ToDoList",
  setup() {
    const undoList = ref<UnDoListType[]>([]);

    const addUnDoItem = (inputValue: string) => {
      console.log(inputValue);
      undoList.value.push({
        status: "div",
        value: inputValue,
      });
      console.log(undoList.value);
    };

    const handleItemDelete = (index: number) => {
      undoList.value.splice(index, 1);
      console.log(undoList.value);
    };

    const changeStatus = (index: number) => {
      const newList: UnDoListType[] = [];
      undoList.value.forEach((item, itemIndex) => {
        newList.push({
          status: itemIndex === index ? "input" : "div",
          value: item.value,
        });
      });
      undoList.value = newList;
    };

    const resetStatus = () => {
      const newList: UnDoListType[] = [];
      undoList.value.forEach((item) => {
        newList.push({
          status: "div",
          value: item.value,
        });
      });
      undoList.value = newList;
    };

    const changeItemValue = ({ value, index }: any) => {
      undoList.value[index].value = value;
    };

    return () => {
      return (
        <div class="hello">
          <Header add={(e) => addUnDoItem(e)} />
          <UnDoList
            list={undoList.value}
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
