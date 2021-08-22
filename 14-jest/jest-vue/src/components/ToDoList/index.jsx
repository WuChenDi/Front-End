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
      this.undoList.push(inputValue);
      console.log(this.undoList);
    },
    handleItemDelete(index) {
      this.undoList.splice(index, 1);
      console.log(this.undoList);
    },
  },
  render() {
    return (
      <div class="hello">
        <Header on-add={this.addUnDoItem} />
        <UnDoList list={this.undoList} on-delete={this.handleItemDelete} />
      </div>
    );
  },
};

export default ToDoList;
