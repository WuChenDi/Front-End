// @ts-nocheck
import "./index.scss";

const Header = {
  name: "Header",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    addToDoItem() {
      if (this.inputValue) {
        this.$emit("add", this.inputValue);
        this.inputValue = "";
      }
    },
  },
  render() {
    return (
      <div class="header">
        <div class="header-content">
          ToDoList:
          <input
            class="header-input"
            data-test="input"
            v-model={this.inputValue}
            vOn:keyup_enter={this.addToDoItem}
            placeholder="add ToDoItem"
          />
        </div>
      </div>
    );
  },
};

export default Header;
