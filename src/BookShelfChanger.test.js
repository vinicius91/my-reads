import React from "react";
import { shallow, mount } from "enzyme";
import BookShelfChanger from "./BookShelfChanger";

describe("<BookShelfChanger />", () => {
  const wrapper = mount(<BookShelfChanger shelf="none" getShelfForUpdate={jest.fn()} />);
  it("shallow renders correctly", () => {
    expect(shallow(<BookShelfChanger shelf="none" getShelfForUpdate={jest.fn()} />));
  });

  it("mount renders correctly", () => {
    expect(wrapper);
  });

  it("passes the shelf to the select value", () => {
    expect(wrapper.find("Select").value === "none");
  });

  it("Select On change call the passed function", () => {
    const updateFunc = jest.fn();
    const wrapperFunc = mount(<BookShelfChanger shelf="none" getShelfForUpdate={updateFunc} />);
    wrapperFunc.find("select").simulate("change");
    expect(updateFunc).toHaveBeenCalledTimes(1);
  });
});
