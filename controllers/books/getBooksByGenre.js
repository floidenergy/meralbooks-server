const Books = require('../../model/book')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3 = require('../../utils/s3')

const { PrepareBook } = require('../util/BooksUtils')

module.exports = async (req, res, next) => {
  try {
    const books = await Books.find({ genre: req.params.id }).populate(['author', 'genre'])
    for (const book of books) {
      PrepareBook(book);
    }
    res.status(200).json(books)
  } catch (error) {
    next({ message: `getBookByGenre: => ${error}` })
  }

}