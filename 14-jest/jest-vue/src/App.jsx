import ToDoList from "./components/ToDoList/index.jsx";
// import HellWorld from "./components/HelloWorld.vue";
import "./App.scss";

export default {
  name: "App",
  render() {
    return (
      <div id="app">
        {/* <HellWorld msg="1231" /> */}
        <ToDoList />
      </div>
    );
  },
};
