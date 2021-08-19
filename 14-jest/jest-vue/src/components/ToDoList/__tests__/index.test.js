import { shallowMount } from "@vue/test-utils";
import ToDoList from "../index.jsx";

describe("ToDoList.vue", () => {
  it("组件渲染正常", () => {
    const wrapper = shallowMount(ToDoList);
  });
});
