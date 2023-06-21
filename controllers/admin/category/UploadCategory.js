const Category = require('../../../model/category');

module.exports = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    category.save();
    res.sendStatus(201)

  } catch (err) {
    console.log(err);
    res.sendStatus(400);  
  }
}