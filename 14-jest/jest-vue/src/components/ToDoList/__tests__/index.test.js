import { shallowMount } from "@vue/test-utils";
import ToDoList from "../index.jsx";
import Header from "../../Header/index.jsx";
import UnDoList from "../../UnDoList/index.jsx";

describe("ToDoList.vue", () => {
  it("初始化时. undoList 为空", () => {
    const wrapper = shallowMount(ToDoList);
    const undoList = wrapper.vm.$data.undoList;
    expect(undoList).toEqual([]);
  });

  // it("addItem 方法执行时，内容增加", () => {
  //   const wrapper = shallowMount(ToDoList);
  //   wrapper.vm.addUnDoItem("hello");
  //   const undoList = wrapper.vm.$data.undoList;
  //   expect(undoList).toEqual(["hello"]);
  // });

  // 集成测试
  // it("监听到 Header 组件的 add 事件时，内容增加", () => {
  //   const content = "hello";
  //   const wrapper = shallowMount(ToDoList);
  //   const header = wrapper.findComponent(Header);
  //   header.vm.$emit("add", content);
  //   const undoList = wrapper.vm.$data.undoList;
  //   expect(undoList).toEqual([content]);
  // });

  // 单元测试
  it("addUnDoItem 执行后，内容增加", async () => {
    const wrapper = shallowMount(ToDoList);
    await wrapper.setData({
      undoList: [
        { status: "div", value: 1 },
        { status: "div", value: 2 },
        { status: "div", value: 3 },
      ],
    });
    wrapper.vm.addUnDoItem(4);
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: "div", value: 1 },
      { status: "div", value: 2 },
      { status: "div", value: 3 },
      { status: "div", value: 4 },
    ]);
  });

  it("使用 UnDoList 应该传递 list 参数", () => {
    const wrapper = shallowMount(ToDoList);
    const undoList = wrapper.findComponent(UnDoList);
    const list = undoList.props("list");
    expect(list).toBeTruthy();
  });

  it("handleDeleteItem 方法执行时，UnDoList 内容减少", async () => {
    const wrapper = shallowMount(ToDoList);
    await wrapper.setData({
      undoList: [
        { status: "div", value: 1 },
        { status: "div", value: 2 },
        { status: "div", value: 3 },
      ],
    });
    wrapper.vm.handleItemDelete(1);
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: "div", value: 1 },
      { status: "div", value: 3 },
    ]);
  });

  it("changeStatus 方法执行时，UnDoList 变化", async () => {
    const wrapper = shallowMount(ToDoList);
    await wrapper.setData({
      undoList: [
        { status: "div", value: 1 },
        { status: "div", value: 2 },
        { status: "div", value: 3 },
      ],
    });
    wrapper.vm.changeStatus(1);
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: "div", value: 1 },
      { status: "input", value: 2 },
      { status: "div", value: 3 },
    ]);
  });

  it("resetStatus 方法执行时，UnDoList 变化", async () => {
    const wrapper = shallowMount(ToDoList);
    await wrapper.setData({
      undoList: [
        { status: "div", value: 1 },
        { status: "input", value: 2 },
        { status: "div", value: 3 },
      ],
    });
    wrapper.vm.resetStatus();
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: "div", value: 1 },
      { status: "div", value: 2 },
      { status: "div", value: 3 },
    ]);
  });

  it("changeItemValue 方法执行时，UnDoList 变化", async () => {
    const wrapper = shallowMount(ToDoList);
    await wrapper.setData({
      undoList: [
        { status: "div", value: 1 },
        { status: "input", value: 2 },
        { status: "div", value: 3 },
      ],
    });
    wrapper.vm.changeItemValue({ index: 1, value: "444" });
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: "div", value: 1 },
      { status: "input", value: "444" },
      { status: "div", value: 3 },
    ]);
  });
});
