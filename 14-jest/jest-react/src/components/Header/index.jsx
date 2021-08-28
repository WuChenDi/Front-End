import { useState } from "react";
import "./index.css";

const Header = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { add } = props;

  return (
    <div className="header">
      <span>ToDoList</span>
      <input
        className="header-input"
        data-test="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13 && inputValue) {
            add?.(inputValue);
            setInputValue('')
          }
        }}
        placeholder="add ToDoItem"
      />
    </div>
  );
};

export default Header;
