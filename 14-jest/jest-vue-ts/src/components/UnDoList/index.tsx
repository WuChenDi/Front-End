import { defineComponent } from "vue";
import { UnDoListPropsDefine } from "../../utils/types";
import "./index.scss";

export default defineComponent({
  name: "UnDoList",
  props: UnDoListPropsDefine,
  setup(props) {
    const handleDelete = (index: number) => {
      props?.delete(index);
    };

    const changeStatus = (index: number) => {
      props?.status(index);
    };
    const handleInputBlur = () => {
      props?.reset();
    };
    const handleInputChange = (value: string, index: number) => {
      props?.change({ value, index });
    };

    return () => {
      const { list } = props;

      return (
        <div class="undocontent">
          <div class="title">
            正在进行：
            <span data-test="count"> {list.length} </span>
          </div>

          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                data-test="item"
                class="undoitem"
                onClick={() => changeStatus(index)}
              >
                {item.status === "input" ? (
                  <input
                    data-test="input"
                    value={item.value}
                    onBlur={handleInputBlur}
                    onChange={(e: any) =>
                      handleInputChange(e.target.value, index)
                    }
                  />
                ) : (
                  <span> {item.value}</span>
                )}

                <span
                  data-test="delete-button"
                  onClick={() => handleDelete(index)}
                  class="delete"
                >
                  -
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  },
});
