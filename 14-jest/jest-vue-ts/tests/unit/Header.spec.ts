import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header";
import { findTestWrapper } from "@/utils/testUtils";

describe("Header.vue", () => {
  // it("样式发生改变，做提示", () => {
  //   const wrapper = shallowMount(Header);
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("输入框存在", () => {
    const wrapper = shallowMount(Header);
    const input = findTestWrapper(wrapper, "input");
    expect(input.exists()).toBe(true);
  });

  it("输入框初始值为空", async () => {
    const wrapper = shallowMount(Header);
    const input = findTestWrapper(wrapper, "input");
    expect(input.text()).toBe("")
    // const inputValue = wrapper.vm.$data.inputValue;
    // expect(wrapper).toBe("");
  });

  // it("输入框发生变化，数据应该跟着变", async () => {
  //   const wrapper = shallowMount(Header);
  //   const input = findTestWrapper(wrapper, "input");
  //   await input.setValue("hello");
  //   const inputValue = wrapper.vm.$data.inputValue;
  //   expect(inputValue).toBe("hello");
  // });

  // it("输入框输入回车，无内容时，无反应", async () => {
  //   const wrapper = shallowMount(Header);
  //   const input = findTestWrapper(wrapper, "input");
  //   await input.setValue("");
  //   await input.trigger("keyup.enter");
  //   // expect(wrapper.emitted.add).toBeTruthy();
  //   expect(wrapper.emitted().add).toBeFalsy();
  // });

  // it("输入框输入回车，有内容时，向外触发事件，同时清空 inputValue", async () => {
  //   const wrapper = shallowMount(Header);
  //   const input = findTestWrapper(wrapper, "input");
  //   await input.setValue("hello");
  //   await input.trigger("keyup.enter");
  //   expect(wrapper.emitted().add).toBeTruthy();
  //   expect(wrapper.vm.$data.inputValue).toBe("");
  // });
});
