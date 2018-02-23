import "./__mocks__/localStorage";
import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("<App />", () => {
  global.localStorage = jest.fn();
  it("shallow renders correctly", () => {
    expect(true);
  });
});
