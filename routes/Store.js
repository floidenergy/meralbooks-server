const { Router } = require('express')

const Author = require('../model/author');
const Book = require('../model/book')

const router = Router();

router.route('/ss/:type')
  .get(async (req, res, next) => {

    let result;
    switch (req.params['type']) {
      case 'author':
        result = await Author.find({ name: { $regex: req.query["query"], $options: 'i' } });
        break;
      default:
        result = await Book.find({ name: { $regex: req.query["query"], $options: "i" } });
    }
    // result.then(data => { res.json(data) })
    result = result.map(r => ({ id: r.id, name: r.name }));
    res.json(result);
  })

router.route('/search/:type/:q')
  .get(async (req, res, next) => {
    let result;
    switch (req.params['type']) {
      case 'author':
        result = await Author.find({ name: { $regex: req.params["q"], $options: 'i' } });
        break;
      default:
        result = await Book.find({ name: { $regex: req.params["q"], $options: "i" } }).populate("author");
    }

    res.json(result);
  })

module.exports = router;