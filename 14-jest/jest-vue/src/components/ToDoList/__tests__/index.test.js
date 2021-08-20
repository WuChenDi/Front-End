import { shallowMount } from "@vue/test-utils";
import ToDoList from "../index.jsx";
import Header from "../../Header/index.jsx";

describe("ToDoList.vue", () => {
  it("ToDoList 初始化时. undoList 应该为空", () => {
    const wrapper = shallowMount(ToDoList);
    const undoList = wrapper.vm.$data.undoList;
    expect(undoList).toEqual([]);
  });

  // it("ToDoList 执行 addItem 的时候，会增加一个内容", () => {
  //   const wrapper = shallowMount(ToDoList);
  //   wrapper.vm.addUnDoItem("hello");
  //   const undoList = wrapper.vm.$data.undoList;
  //   expect(undoList).toEqual(["hello"]);
  // });

  it("ToDoList 监听到 Header 的 addshi jaing addItem 的时候，会增加一个内容", () => {
    const content = "hello";
    const wrapper = shallowMount(ToDoList);
    const header = wrapper.findComponent(Header);
    header.vm.$emit("add", content);
    const undoList = wrapper.vm.$data.undoList;
    expect(undoList).toEqual([content]);
  });
});
