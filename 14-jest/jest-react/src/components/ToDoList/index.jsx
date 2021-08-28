import { useState } from "react";
import Header from "../Header/index.jsx";
import "./index.css";

const ToDoList = () => {
  const [undoList, setUndoList] = useState([]);

  const addUnDoItem = (value) => {
    setUndoList.push({
      status: "div",
      value: value,
    });
  };

  return (
    <div data-test="undoList" undoList={undoList}>
      <Header add={(value) => addUnDoItem(value)} />
    </div>
  );
};

export default ToDoList;
