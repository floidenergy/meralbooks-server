const Category = require("../../../model/category");

module.exports = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400)
  }
}