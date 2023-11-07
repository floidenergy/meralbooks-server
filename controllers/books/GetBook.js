const Book = require('../../model/book');
// const { GetObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const s3 = require('../../utils/s3')

const {PrepareBook} = require('../util/BooksUtils')
module.exports = async (req, res, next) => {
  try {
    // const books = await Book.find().exec(); 
    const books = await Book.find().populate(["author", "genre"]);

    for (const book of books) {
      await PrepareBook(book)
    }

    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
}