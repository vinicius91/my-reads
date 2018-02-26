import React from "react";
import { shallow, mount } from "enzyme";
import BookShelf from "./BookShelf";

describe("<BookShelf />", () => {
  const booksArray = [
    {
      id: "bookOne",
      title: "string",
      backgroundImage: "string",
      authors: ["AuthorOne", "AuthorTwo"],
      imageLinks: { thumbnail: "string" }
    },
    {
      id: "bookTwo",
      title: "string",
      backgroundImage: "string",
      authors: ["AuthorOne", "AuthorTwo"],
      imageLinks: { thumbnail: "string" }
    }
  ];

  it("shallow renders correctly", () => {
    expect(shallow(<BookShelf title="string" books={booksArray} updateBook={jest.fn()} />));
  });

  it("mount renders correctly", () => {
    expect(mount(<BookShelf title="string" books={booksArray} updateBook={jest.fn()} />));
  });

  it("Bookshelf creates 2 Book components when passed 2 books", () => {
    const wrapper = mount(<BookShelf title="string" books={booksArray} updateBook={jest.fn()} />);
    expect(wrapper.find("Book").length).toBe(2);
  });
});
