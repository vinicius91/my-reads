import React from "react";
import { shallow } from "enzyme";
import Book from "./Book";

const authorArray = ["AuthorOne", "AuthorTwo"];

describe("<Book />", () => {
  it("shallow renders correctly", () => {
    expect(
      shallow(
        <Book backgroundImage="string" title="string" authors={authorArray} />
      )
    );
  });
});
