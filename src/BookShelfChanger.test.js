import React from "react";
import { shallow } from "enzyme";
import BookShelfChanger from "./BookShelfChanger";



describe("<BookShelfChanger />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<BookShelfChanger />));
  });
});
