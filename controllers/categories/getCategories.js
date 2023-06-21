const Category = require('../../model/category')

module.exports = async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json(categories);
}