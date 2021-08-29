import { shallow } from "enzyme";
import ToDoList from "../index.jsx";
import Header from "../../Header/index.jsx";
import { findTestWrapper } from "../../../utils/testUtils";

describe("ToDoList.jsx", () => {
  it("初始化时. undoList 为空", () => {
    const wrapper = shallow(<ToDoList />);
    const input = findTestWrapper(wrapper, "undoList");
    expect(input.prop("data-list")).toEqual([]);
  });

  it("addUnDoItem 执行后，内容增加", () => {
    const wrapper = shallow(<ToDoList />);
    const Header = wrapper.find("Header");
    const addFunc = Header.prop("add");
    addFunc("hello");
    const input = findTestWrapper(wrapper, "undoList");
    expect(input.prop("data-list").length).toBe(1);
    expect(input.prop("data-list")[0]).toEqual({
      status: "div",
      value: "hello",
    });
    // addFunc("hello1");
    // const newInput = findTestWrapper(wrapper, "undoList");
    // console.log(newInput.prop("data-list"))
    // expect(newInput.prop("data-list").length).toBe(2);
  });

  it("使用 UnDoList 应该传递 list 参数", () => {
    const wrapper = shallow(<ToDoList />);
    const undoList = wrapper.find("UnDoList");
    const list = undoList.props("list");
    expect(list).toBeTruthy();
  });

  // it("handleDeleteItem 方法执行时，UnDoList 内容减少", async () => {
  //   const wrapper = shallow(<ToDoList />);
  //   wrapper.setState({
  //     undoList: [
  //       { status: "div", value: 1 },
  //       { status: "div", value: 2 },
  //       { status: "div", value: 3 },
  //     ],
  //   });
  //   wrapper.instance().handleItemDelete(1);
  //   expect(wrapper.state("undoList")).toEqual([
  //     { status: "div", value: 1 },
  //     { status: "div", value: 3 },
  //   ]);
  // });

  // it("changeStatus 方法执行时，UnDoList 变化", () => {
  //   const wrapper = shallow(<ToDoList />);
  //   wrapper.setState({
  //     undoList: [
  //       { status: "div", value: 1 },
  //       { status: "div", value: 2 },
  //       { status: "div", value: 3 },
  //     ],
  //   });
  //   wrapper.instance().changeStatus(1);
  //   expect(wrapper.state("undoList")).toEqual([
  //     { status: "div", value: 1 },
  //     { status: "input", value: 2 },
  //     { status: "div", value: 3 },
  //   ]);
  // });

  // it("resetStatus 方法执行时，UnDoList 变化", async () => {
  //   const wrapper = shallowMount(ToDoList);
  //   await wrapper.setData({
  //     undoList: [
  //       { status: "div", value: 1 },
  //       { status: "input", value: 2 },
  //       { status: "div", value: 3 },
  //     ],
  //   });
  //   wrapper.vm.resetStatus();
  //   expect(wrapper.vm.$data.undoList).toEqual([
  //     { status: "div", value: 1 },
  //     { status: "div", value: 2 },
  //     { status: "div", value: 3 },
  //   ]);
  // });

  // it("changeItemValue 方法执行时，UnDoList 变化", async () => {
  //   const wrapper = shallowMount(ToDoList);
  //   await wrapper.setData({
  //     undoList: [
  //       { status: "div", value: 1 },
  //       { status: "input", value: 2 },
  //       { status: "div", value: 3 },
  //     ],
  //   });
  //   wrapper.vm.changeItemValue({ index: 1, value: "444" });
  //   expect(wrapper.vm.$data.undoList).toEqual([
  //     { status: "div", value: 1 },
  //     { status: "input", value: "444" },
  //     { status: "div", value: 3 },
  //   ]);
  // });
});
