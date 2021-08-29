import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ToDoList from "../index.jsx";
import Header from "../../Header/index.jsx";
import { findTestWrapper } from "../../../utils/testUtils";

Enzyme.configure({ adapter: new Adapter() });

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
    // await addFunc("hello1");
    // const newInput = findTestWrapper(wrapper, "undoList");
    // console.log(newInput.prop("data-list"))
    // expect(newInput.prop("undoList").length).toBe(2);
  });
});
