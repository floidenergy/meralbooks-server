const fs = require('fs')
const Book = require('../../../model/book')
const Author = require('../../../model/author');

module.exports = async (req, res, next) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id)
    await Author.findByIdAndUpdate(book._id, { $pull: { books: book._id } })

    try {
      fs.unlinkSync(`./Uploads/Images/Book/${book.img.split('/')[4]}`);
    } catch (error) { }

    await book.deleteOne();

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
}