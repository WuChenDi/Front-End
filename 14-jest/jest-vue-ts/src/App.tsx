import { defineComponent } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import ToDoList from "./components/ToDoList/index";
import "./App.scss";

export default defineComponent({
  name: "App",
  setup() {
    return () => {
      return (
        <div id="app">
          {/* <img alt="Vue logo" src="./assets/logo.png" />
          <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> */}
          <ToDoList />
        </div>
      );
    };
  },
});
