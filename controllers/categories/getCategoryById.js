const Category = require('../../model/category')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (err) {
    req.status(400);
  }
}