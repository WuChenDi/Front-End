import "./index.scss";

const UnDoList = {
  name: "UnDoList",
  props: ["list"],
  methods: {
    handleDelete(index) {
      console.log(index);
      this.$emit("delete", index);
    },
  },
  render() {
    return (
      <div class="undocontent">
        <div class="title">
          正在进行：
          <span data-test="count"> {this.list.length} </span>
        </div>

        <ul>
          {this.list.map((item, index) => (
            <li key={index} data-test="item" class="undoitem">
              {item}
              <span
                data-test="delete-button"
                on-click={() => this.handleDelete(index)}
                class="delete"
              >
                -
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

export default UnDoList;
