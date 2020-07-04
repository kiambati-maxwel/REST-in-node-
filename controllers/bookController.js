/* eslint-disable quotes */
const chalk = require('chalk');

function booksController(Book) {
  async function post(req, res) {
    const book = new Book(req.body);
    await book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return console.log(chalk.redBright(`err`));
      }
      const returnBookLinks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        // eslint-disable-next-line no-underscore-dangle
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBookLinks);
    });
  }

  return { post, get };
}

module.exports = booksController;
