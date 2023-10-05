const genre = require("../../../model/genre");

module.exports = async (req, res, next) => {
  try {
    await genre.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400)
  }
}