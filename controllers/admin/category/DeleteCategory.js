const Category = require('../../../model/category');
const Books = require('../../../model/book')
 
const {ObjectId} = require('mongoose').Types;

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    
    const books = await Books.find({category: id})
    books.forEach(book => {
      book.category = book.category.filter(cat => cat !==id );
      book.save();
    })

    const result = await Category.findByIdAndRemove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}