import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import "./__mocks__/localStorage";
import Main from "./Main";

jest.mock("./BooksAPI", () => ({
  getAll: jest.fn(() => new Promise(() => "Ok")),
  update: jest.fn(() => new Promise(() => "Ok"))
}));

describe("<Main />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Main />));
  });
  // prettier-ignore
  it("mount renders correctly the router", () => {
    const wrapper = mount(<MemoryRouter initialEntries={["/"]}><Main /></MemoryRouter>);
    expect(wrapper);
  });
  // prettier-ignore
  it("Mount main inside router", () => {
    const wrapper = mount(<MemoryRouter initialEntries={["/"]}><Main /></MemoryRouter>);
    expect(wrapper.find('Main').length).toBe(1);
  });
});
