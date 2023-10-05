const genre = require('../../../model/genre');
const Books = require('../../../model/book')
 
const {ObjectId} = require('mongoose').Types;

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    
    const books = await Books.find({genre: id})
    books.forEach(book => {
      book.genre = book.genre.filter(cat => cat !==id );
      book.save();
    })

    const result = await genre.findByIdAndRemove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}