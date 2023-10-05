const Genre = require('../../model/genre')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Genre = await Genre.findById(id);
    res.status(200).json(Genre);
  } catch (err) {
    req.status(400);
  }
}