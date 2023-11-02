const Books = require('../../model/book')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3 = require('../../utils/s3')

module.exports = async (req, res, next) => {
  try {

    const books = await Books.find({ genre: req.params.id }).populate(['author', 'genre'])
      .catch(err => res.status(404).json({ message: "Genre Not Found" }))

    for (const book of books) {
      if (book.review?.length !== 0)
        book.populate('review')

      const getBookThumbCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.thumb
      });

      const getBookImageCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.img
      });

      const getAuthorThumbCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.author.thumb
      });

      const getAuthorImageCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.author.img
      });

      book.author.thumb = await getSignedUrl(s3, getAuthorThumbCommand, { expiresIn: 120 });
      book.author.img = await getSignedUrl(s3, getAuthorImageCommand, { expiresIn: 120 });

      book.thumb = await getSignedUrl(s3, getBookThumbCommand, { expiresIn: 120 });
      book.img = await getSignedUrl(s3, getBookImageCommand, { expiresIn: 120 });
    }

    res.status(200).json(books)

  } catch (error) {
    // console.log(error);
    // res.status(404).json({ message: "Genre Not Found" });
    next({ message: `getBookByGenre: => ${error}` })
  }

}