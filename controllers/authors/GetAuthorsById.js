const Author = require('../../model/author');

module.exports = async (req, res, next) => {
  try {

    const author = await Author.findById(req.params.id);
    if (author.books.length !== 0)
      await author.populate('books')

    // Object.assign(author, {UTCdob: author.dob.toUTCString().substring(0, 16)})
    author.UTCdob = author.dob.toUTCString().substring(0, 16);

    delete author.updatedAt
    delete author.__v

    res.status(200).json({...author._doc, UTCdob: author.dob.toUTCString().substring(0, 16)})

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Author Not Found" });
  }
}