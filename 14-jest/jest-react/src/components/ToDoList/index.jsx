import { useState } from "react";
import Header from "../Header/index.jsx";
import UnDoList from "../UnDoList/index.jsx";
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

  const handleItemDelete = (index) => {
    undoList.splice(index, 1);
    setUndoList([].concat(undoList));
  };

  const changeStatus = (index) => {
    const newList = [];
    undoList.forEach((item, itemIndex) => {
      newList.push({
        status: itemIndex === index ? "input" : "div",
        value: item.value,
      });
    });
    setUndoList(newList);
  };

  return (
    <div data-test="undoList" data-list={undoList}>
      <Header add={(value) => addUnDoItem(value)} />
      <UnDoList
        list={undoList}
        deleteItem={handleItemDelete}
        changeStatus={changeStatus}
      />
    </div>
  );
};

export default ToDoList;
