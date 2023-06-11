const { Router } = require('express')
const GetAuthors = require('../controllers/authors/GetAuthors')
const GetAuthorsById = require('../controllers/authors/GetAuthorsById');

const router = Router();

router.route('/authors')
  .get(GetAuthors);

router.route('/authors/:id')
  .get(GetAuthorsById)
  


module.exports = router;