import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import Home from "../src/components/Home";
import App from "../src/components/App";

describe("rendering components", () => {
  it("renders App without crashing", () => {
    shallow(<App />);
  });

  it("renders Home component without crashing", () => {
    const wrapper = shallow(<App />);
    const home = shallow(<Home />);
    expect(wrapper.contains(home)).toEqual(true);
  });
});
