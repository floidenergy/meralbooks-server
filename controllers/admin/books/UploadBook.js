const fs = require('fs');
const Book = require('../../../model/book')

/** 
 * WHAT TO DO TOMORROW
 * 
 *  //TODO: adding category database and fix the book->category schema
 */

module.exports = async (req, res, next) => {

  try {
      

    const data = req.body;

    const book = new Book({
      img: `${process.env.SERVER_LINK}/book/${req.file.filename}`,
      name: data.name,
      description: data.description,
      author: data.author,
      price: data.price,
      language: data.language,
      category: data.category
    })

    try {
      await book.save();
      res.status(200).json({ message: "Book Added" });
    } catch (err) {
      console.log(err);
      fs.unlinkSync(req.file.path)
      next({ message: "Couldn't add A new Book", code: 500 });
    }

  } catch (error) {
    next(error)
  }
}