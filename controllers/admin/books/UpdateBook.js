const Author = require('../../../model/author');
const Book = require('../../../model/book');
const fs = require('fs')

module.exports = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    console.log(req.body);

    if (req.file) {
      if (book.img) {
        fs.unlinkSync(`./Uploads/Images/Author/${book.img.split('/')[4]}`)
      }
      book.img = `${process.env.SERVER_LINK}/book/${req.file.filename}`;
    }

    // ||====> **Update book from author** <====||

    // ====> delete book from the first author

    // ====> adding book to the second author
    const author = await Author.findById(req.body.author)
    if (!author.books.some(bk => book._id.toString() === bk.toString())) {
      await Author.findByIdAndUpdate(book.author, { $pull: { books: book._id } });
      author.books.push(book._id);
      await author.save()
    } else {
      console.log(`${book.name} is already in ${author.name}`);
    }

    // ||====> edit categories in book <====||
    book.category = req.body.category;
    // ||====> edit language Language <====||
    book.language = req.body.language;

    book.author = req.body.author;

    book.name = req.body.name;
    book.price = req.body.price;
    book.description = req.body.description;

    await book.save();

    res.send('ok');
  } catch (error) {
    console.log(error);
  }
}