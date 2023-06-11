const Author = require('../../model/author');

module.exports = async (req, res, next) => {

  const authors = await Author.find();
  res.status(200).json(authors);
}