import { shallow } from "enzyme";
import UnDoList from "../index.jsx";
import { findTestWrapper } from "../../../utils/testUtils";

describe("UnDoList.jsx", () => {
  it("list 参数为[], count 值应该为0，且列表无内容", () => {
    const wrapper = shallow(<UnDoList list={[]} />);

    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(countElem.at(0).text()).toEqual("0");
    expect(listItems.length).toEqual(0);
  });

  it("list 参数为[1,2,3], count 值应该为3，且列表有内，且存在删除按钮", () => {
    const listData = [
      { status: "div", value: 1 },
      { status: "div", value: 2 },
      { status: "div", value: 3 },
    ];
    const wrapper = shallow(<UnDoList list={listData} />);

    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    const deleteButtons = findTestWrapper(wrapper, "delete-button");
    expect(countElem.text()).toEqual("3");
    expect(listItems.length).toEqual(3);
    expect(deleteButtons.length).toEqual(3);
  });

  it("删除按钮被点击时，向外触发删除事件", () => {
    const listData = [
      { status: "div", value: 1 },
      { status: "div", value: 2 },
      { status: "div", value: 3 },
    ];
    const fn = jest.fn();
    const INDEX = 1;
    const wrapper = shallow(<UnDoList list={listData} deleteItem={fn} />);

    const deleteButtons = findTestWrapper(wrapper, "delete-button").at(INDEX);
    deleteButtons.simulate("click");
    expect(fn).toHaveBeenLastCalledWith(INDEX);
  });

  it("列表项被点击，向外触发 changeStatus 事件", () => {
    const listData = [
      { status: "div", value: 1 },
      { status: "div", value: 2 },
      { status: "div", value: 3 },
    ];
    const fn = jest.fn();
    const INDEX = 1;
    const wrapper = shallow(<UnDoList list={listData} changeStatus={fn} />);

    const deleteItems = findTestWrapper(wrapper, "list-item").at(INDEX);
    deleteItems.simulate("click");
    expect(fn).toHaveBeenLastCalledWith(INDEX);

    // const wrapper = shallowMount(UnDoList, {
    //   propsData: {
    //     list: [
    //       { status: "div", value: 1 },
    //       { status: "div", value: 2 },
    //       { status: "div", value: 3 },
    //     ],
    //   },
    // });
    // const deleteButtons = findTestWrapper(wrapper, "item").at(1);
    // deleteButtons.trigger("click");
    // console.log(wrapper.emitted().status);
    // expect(wrapper.emitted().status).toBeTruthy();
    // expect(wrapper.emitted().status[0][0]).toBe(1);
  });

  // it("列表项显示一个输入框，两个正常内容", () => {
  //   const wrapper = shallowMount(UnDoList, {
  //     propsData: {
  //       list: [
  //         { status: "div", value: 1 },
  //         { status: "input", value: 2 },
  //         { status: "div", value: 3 },
  //       ],
  //     },
  //   });
  //   const input = findTestWrapper(wrapper, "input");
  //   expect(input.at(0).element.value).toBe("2");
  //   expect(input.length).toBe(1);
  // });

  // it("输入框失去焦点时，向外触发 reset 事件", () => {
  //   const wrapper = shallowMount(UnDoList, {
  //     propsData: {
  //       list: [
  //         { status: "div", value: 1 },
  //         { status: "input", value: 2 },
  //         { status: "div", value: 3 },
  //       ],
  //     },
  //   });
  //   const inputElem = findTestWrapper(wrapper, "input").at(0);
  //   inputElem.trigger("blur");
  //   expect(wrapper.emitted().reset).toBeTruthy();
  // });

  // it("输入框变化时，向外触发 change 事件", () => {
  //   const wrapper = shallowMount(UnDoList, {
  //     propsData: {
  //       list: [
  //         { status: "div", value: 1 },
  //         { status: "input", value: 123 },
  //         { status: "div", value: 3 },
  //       ],
  //     },
  //   });
  //   const inputElem = findTestWrapper(wrapper, "input").at(0);
  //   // inputElem.trigger("change", {
  //   //   value: 123,
  //   //   index: 1,
  //   // });

  //   // you cannot set the target value of an event. See the notes section of the docs for more details—https://vue-test-utils.vuejs.org/api/wrapper/trigger.html
  //   // inputElem.trigger("change", {
  //   //   target: { value: 123 },
  //   // });

  //   inputElem.trigger("change");
  //   console.log(wrapper.emitted().change);
  //   expect(wrapper.emitted().change).toBeTruthy();
  //   expect(wrapper.emitted().change[0][0]).toEqual({
  //     value: "123",
  //     index: 1,
  //   });
  // });
});
