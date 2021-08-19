import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const root = document.createElement("div");
//     root.className = "root";
//     document.body.appendChild(root);
//     new Vue({
//       render: (h) =>
//         h(HelloWorld, {
//           props: {
//             msg: "new message",
//           },
//         }),
//     }).$mount(".root");
//     console.log(document.body.innerHTML);
//     expect(document.getElementsByClassName("hello").length).toBe(1);
//   });
// });

describe("HelloWorld.vue", () => {
  // it("renders props.msg when passed", async() => {
  //   const msg = "new message";
  //   const wrapper = shallowMount(HelloWorld, {
  //     propsData: { msg },
  //   });
  //   expect(wrapper.props("msg")).toEqual(msg);
  //   expect(wrapper.findAll(".test").length).toBe(1);
  //   // expect(wrapper.text()).toMatch(msg);
  //   await wrapper.setProps({ msg: "hello" });
  //   expect(wrapper.props("msg")).toEqual("hello");
  // });
  it("组件渲染正常", () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg: "new message" },
    });
    expect(wrapper).toMatchSnapshot()
  });
});
