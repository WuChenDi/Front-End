import { shallowMount } from "@vue/test-utils";
import ToDoList from "../index.jsx";
import Header from "../../Header/index.jsx";
import UnDoList from "../../UnDoList/index.jsx";

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

  // 集成测试
  // it("ToDoList 监听到 Header 的 add 事件时，会增加一个内容", () => {
  //   const content = "hello";
  //   const wrapper = shallowMount(ToDoList);
  //   const header = wrapper.findComponent(Header);
  //   header.vm.$emit("add", content);
  //   const undoList = wrapper.vm.$data.undoList;
  //   expect(undoList).toEqual([content]);
  // });

  // 单元测试
  it("ToDoList 中 addUnDoItem 方法被调用时，UnDoList 列表内容会被新增一个", () => {
    const wrapper = shallowMount(ToDoList);
    wrapper.setData({
      undoList: [1, 2, 3],
    });
    wrapper.vm.addUnDoItem(4);
    expect(wrapper.vm.$data.undoList).toEqual([1, 2, 3, 4]);
  });

  it("ToDoList 调用 UnDoList 应该传递 list 参数", () => {
    const wrapper = shallowMount(ToDoList);
    const undoList = wrapper.findComponent(UnDoList);
    const list = undoList.props("list");
    expect(list).toBeTruthy();
  });

  it("ToDoList 中 handleDeleteItem 方法被调用时，UnDoList 列表内容会被删除一个", () => {
    const wrapper = shallowMount(ToDoList);
    wrapper.setData({
      undoList: [1, 2, 3],
    });
    wrapper.vm.handleItemDelete(1);
    expect(wrapper.vm.$data.undoList).toEqual([1, 3]);
  });
});
