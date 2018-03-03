const BooksAPI = jest.genMockFromModule("./BooksAPI");

const getAll = () => {};

const update = () => {};

BooksAPI.getAll = getAll;
BooksAPI.update = update;

module.exports = BooksAPI;
