import { render, screen } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { findTestWrapper } from "./utils/testUtils";

Enzyme.configure({ adapter: new Adapter() });

describe("App.js", () => {
  it("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders learn react link enzyme", () => {
    const wrapper = shallow(<App />);
    // 避免使用 class
    // expect(wrapper.find(".App").length).toBe(1);
    // console.log(wrapper.debug())
    // expect(wrapper.find(".App").prop("title")).toBe("jest react");

    const countElem = findTestWrapper(wrapper, "App");
    expect(countElem.length).toBe(1);
  });
});
