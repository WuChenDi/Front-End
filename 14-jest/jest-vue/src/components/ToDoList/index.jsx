import Header from "../Header/index.jsx";
import UnDoList from "../UnDoList/index.jsx";

const ToDoList = {
  name: "ToDoList",
  data() {
    return {
      undoList: [],
    };
  },
  methods: {
    addUnDoItem(inputValue) {
      this.undoList.push({
        status: "div",
        value: inputValue,
      });
      console.log(this.undoList);
    },
    handleItemDelete(index) {
      this.undoList.splice(index, 1);
      console.log(this.undoList);
    },
    changeStatus(index) {
      const newList = [];
      this.undoList.forEach((item, itemIndex) => {
        newList.push({
          status: itemIndex === index ? "input" : "div",
          value: item.value,
        });
      });
      this.undoList = newList;
    },
    resetStatus() {
      const newList = [];
      this.undoList.forEach((item, itemIndex) => {
        newList.push({
          status: "div",
          value: item.value,
        });
      });
      this.undoList = newList;
    },
    changeItemValue({ value, index }) {
      this.undoList[index].value = value;
    },
  },
  render() {
    return (
      <div class="hello">
        <Header on-add={this.addUnDoItem} />
        <UnDoList
          list={this.undoList}
          on-delete={this.handleItemDelete}
          on-status={this.changeStatus}
          on-reset={this.resetStatus}
          on-change={this.changeItemValue}
        />
      </div>
    );
  },
};

export default ToDoList;
