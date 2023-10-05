const genre = require('../../model/genre')

module.exports = async (req, res, next) => {
  const categories = await genre.find();

  res.status(200).json(categories);
}