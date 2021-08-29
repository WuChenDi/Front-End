import { useState } from "react";
import Header from "../Header/index.jsx";
import "./index.css";

const ToDoList = () => {
  const [undoList, setUndoList] = useState([]);

  const addUnDoItem = (value) => {
    setUndoList([
      ...undoList,
      {
        status: "div",
        value: value,
      },
    ]);
  };

  return (
    <div data-test="undoList" data-list={undoList}>
      <Header add={(value) => addUnDoItem(value)} />
      <ul>
        {undoList.map((item, index) => (
          <li key={index}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
