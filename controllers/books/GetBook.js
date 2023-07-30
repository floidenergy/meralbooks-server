const Book = require('../../model/book');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require('../../utils/s3')

module.exports = async (req, res, next) => {
  try {
    const books = await Book.find().populate(['author', 'category', ]);

    for(const book of books){
      if(book.review?.length !== 0)
        book.populate('review')

      const getBookCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.img
      })

      const getAuthorCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.author.img
      })

      book.img = await getSignedUrl(s3, getBookCommand, {expiresIn: 120});
      book.author.img = await getSignedUrl(s3, getAuthorCommand, {expiresIn: 120} );
    }

    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error'});
  }
}