import "./index.css";

const UnDoList = (props) => {
  const { list, deleteItem, changeStatus } = props;

  const handleInputBlur = () => {
    console.log("reset");
  };
  const handleInputChange = (value, index) => {
    console.log("change", { value, index });
  };

  return (
    <div className="undocontent">
      <div className="title">
        正在进行：
        <span data-test="count">{list.length}</span>
      </div>
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            data-test="list-item"
            className="undoitem"
            onClick={() => changeStatus(index)}
          >
            {item.status === "input" ? (
              <input
                data-test="input"
                value={item.value}
                onBlur={handleInputBlur}
                onChange={(e) => handleInputChange(e.target.value, index)}
              />
            ) : (
              <span>{item.value}</span>
            )}
            <span
              data-test="delete-button"
              onClick={() => deleteItem(index)}
              className="delete"
            >
              -
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnDoList;
