const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const Book = require('../../model/book');
const s3 = require('../../utils/s3')

module.exports = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(['author']);

    await book.populate(['category'])

    if (book.review.length !== 0)
      await book.populate('review')

    const getCommand = new GetObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: book.img
    })

    const getAuthorCommand = new GetObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: book.author.img
    })

    book.img = await getSignedUrl(s3, getCommand, { expiresIn: 120 });
    book.author.img = await getSignedUrl(s3, getAuthorCommand, { expiresIn: 120 });

    res.status(200).json(book);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}