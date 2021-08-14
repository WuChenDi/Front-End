// @ts-nocheck
import ToDoList from "./components/ToDoList/index.jsx";
import "./App.scss";

export default {
  name: "App",
  render() {
    return (
      <div id="app">
        <ToDoList />
      </div>
    );
  },
};
