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
    expect(input.prop("undoList")).toEqual([]);
  });

  it("addUnDoItem 方法执行时，内容增加", () => {
    const wrapper = shallow(<ToDoList />);
    const Header = wrapper.find("Header");
    // console.log(Header.prop("add"))
    console.log(wrapper.instance());
    // expect(Header.prop("addUnDoItem")).toBe(wrapper.instance().addUnDoItem);
  });

  // it("addUnDoItem 方法执行时，内容增加", () => {
  //   const wrapper = shallow(<ToDoList />, {
  //     wrappingComponent: ToDoList,
  //   });
  //   const provider = wrapper.getWrappingComponent();
  //   const Header = wrapper.find("Header");
  //   // console.log(Header.prop("add"))
  //   console.log(provider)
  //   // expect(Header.prop("addUnDoItem")).toBe(wrapper.instance().addUnDoItem);
  // });
});
