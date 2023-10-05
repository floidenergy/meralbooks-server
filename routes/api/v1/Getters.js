const { Router } = require('express')

const GetCategories = require('../../../controllers/genre/getGenre');
const GetgenreById = require('../../../controllers/genre/getGenreById');

const GetAuthors = require('../../../controllers/authors/GetAuthors');
const GetAuthorsById = require('../../../controllers/authors/GetAuthorsById');

const getBooks = require('../../../controllers/books/GetBook');
const getBooksById = require('../../../controllers/books/GetBookById');
const getBooksByGenre = require('../../../controllers/books/getBookByGenre')
const getBooksByAuthor = require('../../../controllers/books/getBookByAuthor')

const router = Router();

router.route('/books')
  .get(getBooks);

router.route('/books/:id')
  .get(getBooksById)

router.route('/books/genre/:id')
  .get(getBooksByGenre)

router.route('/books/author/:id')
  .get(getBooksByAuthor)

router.route('/authors')
  .get(GetAuthors);

router.route('/authors/:id')
  .get(GetAuthorsById);

router.route('/genre')
  .get(GetCategories);

router.route('/genre/:id')
  .get(GetgenreById);



module.exports = router;