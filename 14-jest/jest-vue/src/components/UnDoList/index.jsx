import "./index.scss";

const UnDoList = {
  name: "UnDoList",
  props: ["list"],
  methods: {
    handleDelete(index) {
      this.$emit("delete", index);
    },
    changeStatus(index) {
      this.$emit("status", index);
    },
    handleInputBlur() {
      this.$emit("reset");
    },
    handleInputChange(value, index) {
      this.$emit("change", { value, index });
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
            <li
              key={index}
              data-test="item"
              class="undoitem"
              on-click={() => this.changeStatus(index)}
            >
              {item.status === "input" ? (
                <input
                  data-test="input"
                  value={item.value}
                  on-blur={this.handleInputBlur}
                  on-change={(e) =>
                    this.handleInputChange(e.target.value, index)
                  }
                />
              ) : (
                <span> {item.value}</span>
              )}

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
