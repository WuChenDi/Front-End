import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../index.jsx";
import { findTestWrapper } from "../../../utils/testUtils";

Enzyme.configure({ adapter: new Adapter() });

describe("Header.jsx", () => {
  it("样式发生改变，做提示", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it("输入框存在", () => {
    const wrapper = shallow(<Header />);
    const input = findTestWrapper(wrapper, "input");
    expect(input.exists()).toBe(true);
  });

  it("输入框初始值为空", () => {
    const wrapper = shallow(<Header />);
    const input = findTestWrapper(wrapper, "input");
    expect(input.prop("value")).toBe("");
  });

  it("输入框发生变化，数据应该跟着变", () => {
    const wrapper = shallow(<Header />);
    const input = findTestWrapper(wrapper, "input");
    input.simulate("change", { target: { value: "hello" } });
    // 在重新渲染之后，必须再次运行findTestWrapper方法，而不是依赖于以前的值
    const newInput = findTestWrapper(wrapper, "input");
    expect(newInput.prop("value")).toBe("hello");
  });

  it("输入框输入回车，无内容时，无反应", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header add={fn} />);
    const input = findTestWrapper(wrapper, "input");
    input.simulate("change", { target: { value: "" } });
    const newInput = findTestWrapper(wrapper, "input");
    newInput.simulate("keyup", { keyCode: 13 });
    expect(fn).not.toHaveBeenCalled();
  });

  it("输入框输入回车，有内容时，向外触发事件，同时清空 inputValue", async () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header add={fn} />);
    const input = findTestWrapper(wrapper, "input");
    input.simulate("change", { target: { value: "hello" } });

    const newInput = findTestWrapper(wrapper, "input");
    newInput.simulate("keyup", { keyCode: 13 });
    expect(fn).toHaveBeenCalled();
    // 最后一次调用时参数
    expect(fn).toHaveBeenCalledWith("hello");

    const _newInput = findTestWrapper(wrapper, "input");
    expect(_newInput.prop("value")).toBe("");
  });
});
