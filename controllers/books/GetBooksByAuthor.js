const Author = require('../../model/author')
// const { GetObjectCommand } = require('@aws-sdk/client-s3')
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// const s3 = require('../../utils/s3')

const {PrepareBook} = require('./utils')
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
      await PrepareBook(book)
    }

    res.status(200).json(author.books)

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Author Not Found" });
  }

}