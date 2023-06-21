const Author = require('../../model/author');

module.exports = async (req, res, next) => {

  const authors = await Author.find();

  authors.forEach(async author => {
    if (author.books.length !== 0) {
      await author.populate('books');
    }

    author.UTCdob = author.dob.toUTCString().substring(0, 16);

    delete author.updatedAt
    delete author.__v
    
  })

  res.status(200).json(authors);
}