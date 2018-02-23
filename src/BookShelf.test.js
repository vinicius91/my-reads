import React from "react";
import { shallow } from "enzyme";
import BookShelf from "./BookShelf";

describe("<BookShelf />", () => {
  const booksArray = [
    {
      title: "string",
      backgroundImage: "string",
      authors: { 0: "AuthorOne", 1: "AuthorTwo" },
      imageLinks: { thumbnail: "string" }
    },
    {
      title: "string",
      backgroundImage: "string",
      authors: { 0: "AuthorOne", 1: "AuthorTwo" },
      imageLinks: { thumbnail: "string" }
    }
  ];

  global.localStorage = { getItem: jest.fn(), setItem: jest.fn() };

  const books = it("shallow renders correctly", () => {
    expect(shallow(<BookShelf title="string" books={booksArray} />));
  });
});
