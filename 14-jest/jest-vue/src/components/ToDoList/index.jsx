// @ts-nocheck
import Header from "../Header/index.jsx";
import UnDoList from "../UnDoList/index.jsx";

export default {
  name: "ToDoList",
  data() {
    return {
      undolist: [],
    };
  },
  methods: {
    addUnDoItem(inputValue) {
      this.undolist.push(inputValue);
      console.log(this.undolist);
    },
    handleItemDelete(index) {
      this.undolist.splice(index, 1);
      console.log(this.undolist);
    },
  },
  render() {
    return (
      <div class="hello">
        <Header on-add={this.addUnDoItem} />
        <UnDoList list={this.undolist} on-delete={this.handleItemDelete} />
      </div>
    );
  },
};
