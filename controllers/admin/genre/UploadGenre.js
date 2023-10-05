const Genre = require('../../../model/genre');

module.exports = async (req, res, next) => {
  try {
    const genre = new Genre(req.body);
    
    genre.save();
    res.sendStatus(201)

  } catch (err) {
    console.log(err);
    res.sendStatus(400);  
  }
}