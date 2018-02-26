import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import "./__mocks__/localStorage";
import Main from "./Main";

const BooksAPI = {
  update: jest.fn(),
  getAll: jest.fn()
};

describe("<Main />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Main />));
  });

  it("mount renders correctly", () => {
    const wrapper = mount(<MemoryRouter initialEntries={["/"]}>
      <Main />
                          </MemoryRouter>);
    expect(wrapper);
  });

  it("Called setBooks once", () => {
    const wrapper = mount(<MemoryRouter initialEntries={["/"]}>
      <Main />
                          </MemoryRouter>);
    const functionSetBook = wrapper.find("setBooks").then(result => {
      expect(functionSetBook).toBeCalledTimes(1);
    })
    
  });
});
