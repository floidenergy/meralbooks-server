const Author = require('../../model/author')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3 = require('../../utils/s3')

module.exports = async (req, res, next) => {
  try {

    const author = await Author.findById(req.params.id);
    if (author.books.length !== 0) {
      await author.populate('books')
      await author.populate([
        {
          path: 'books',
          populate: {
            path: 'genre',
            model: 'Genre'
          }
        },
        {
          path: "books",
          populate: {
            path: 'author',
            model: 'Author'
          }
        }
      ])
    }


    for (const book of author.books) {
      if (book.review?.length !== 0)
        book.populate('review')
        // book.populate({
        //   // path: "books",
        //   path: {
        //     path: "review",
        //     model: "bookReview"
        //   }
        // })

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

    res.status(200).json(author.books)

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Author Not Found" });
  }

}