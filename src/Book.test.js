import React from "react";
import { shallow, mount } from "enzyme";
import Book from "./Book";

const authorArray = ["AuthorOne", "AuthorTwo"];

describe("<Book />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Book book={{}} updateBook={jest.fn()} />));
  });

  it("mount renders correctly", () => {
    expect(mount(<Book book={{}} updateBook={jest.fn()} />));
  });
});
