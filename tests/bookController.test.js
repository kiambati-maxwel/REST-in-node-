/* eslint-disable */
const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/bookController');

describe('Book controller tests : ', () => {
  describe('post test', () => {
    it('should not allow an entry to an empty post', () => {
      const Book = function (book) { this.save = () => { } };

      const req = {
        body: {
          author: 'Jon'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(book);
      controller.post(req, res);
      res.status.calledWith(400).should.equal(true), `bad status ${res.status.args[0][0]}`;
      res.send.calledWith('title is required').should.equal(true);
    });
  });
});