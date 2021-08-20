import { shallowMount } from "@vue/test-utils";
import Header from "../index.jsx";

describe("Header.vue", () => {
  it("Header 样式发生改变，做提示", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper).toMatchSnapshot();
  });

  it("Header 包含 input 框", () => {
    const wrapper = shallowMount(Header);
    const input = wrapper.find('[data-test="input"]');
    expect(input.exists()).toBe(true);
  });

  it("Header 中 input 框初始值为空", () => {
    const wrapper = shallowMount(Header);
    const inputValue = wrapper.vm.$data.inputValue;
    expect(inputValue).toBe("");
  });

  it("Header 中 input 框值发生变化，数据应该跟着变", () => {
    const wrapper = shallowMount(Header);
    const input = wrapper.find('[data-test="input"]');
    input.setValue("hello");
    const inputValue = wrapper.vm.$data.inputValue;
    expect(inputValue).toBe("hello");
  });

  it("Header 中 input 框输入回车，无内容时，无反应", () => {
    const wrapper = shallowMount(Header);
    const input = wrapper.find('[data-test="input"]');
    input.setValue("");
    input.trigger("keyup.enter");
    // expect(wrapper.emitted.add).toBeTruthy();
    expect(wrapper.emitted().add).toBeFalsy();
  });

  it("Header 中 input 框输入回车，有内容时，向外触发事件", () => {
    const wrapper = shallowMount(Header);
    const input = wrapper.find('[data-test="input"]');
    input.setValue("hello");
    input.trigger("keyup.enter");
    expect(wrapper.emitted().add).toBeTruthy();
  });

  it("Header 中 input 框输入回车，有内容时，向外触发事件，同时清空 inputValue", () => {
    const wrapper = shallowMount(Header);
    const input = wrapper.find('[data-test="input"]');
    input.setValue("hello");
    input.trigger("keyup.enter");
    expect(wrapper.emitted().add).toBeTruthy();
    expect(wrapper.vm.$data.inputValue).toBe("");
  });
});
