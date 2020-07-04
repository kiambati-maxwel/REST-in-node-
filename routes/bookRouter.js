/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
const express = require('express');
const chalk = require('chalk');
const booksController = require('../controllers/bookController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  // one book router
  // middle ware
  bookRouter.use('/books/:bookID', (req, res, next) => {
    Book.findById(req.params.bookID, (err, book) => {
      if (err) {
        return console.log(chalk.redBright(`${err}`));
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookID')
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      const genre = encodeURI(req.book.genre);
      returnBook.links = {};
      returnBook.links
        .filter_by_genre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      const {
        title,
        author,
        genre,
        read
      } = req.body;

      book.title = title;
      book.author = author;
      book.genre = genre;
      book.read = read;

      req.book.save((err) => {
        if (err) {
          return console.log(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      /* eslint-disable-next-line no-underscore-dangle */
      if (req.body._id) {
        /* eslint-disable-next-line no-underscore-dangle */
        delete req.body._id;
      }

      Object.entries(req.body).forEach((element) => {
        const key = element[0];
        const value = element[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return console.log(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return console.log(chalk.redBright(err));
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}
module.exports = routes;
