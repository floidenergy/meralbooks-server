const { Router } = require('express')

const GetCategories = require('../../../controllers/categories/getCategories');
const GetCategoryById = require('../../../controllers/categories/getCategoryById');

const GetAuthors = require('../../../controllers/authors/GetAuthors');
const GetAuthorsById = require('../../../controllers/authors/GetAuthorsById');

const getBooks = require('../../../controllers/books/GetBook');
const getBooksById = require('../../../controllers/books/GetBookById');

const router = Router();



router.route('/books')
  .get(getBooks);

router.route('/books/:id')
  .get(getBooksById)

router.route('/authors')
  .get(GetAuthors);

router.route('/authors/:id')
  .get(GetAuthorsById);

router.route('/category')
  .get(GetCategories);

router.route('/category/:id')
  .get(GetCategoryById);

module.exports = router;