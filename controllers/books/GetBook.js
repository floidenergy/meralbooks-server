const Book = require('../../model/book');

module.exports = async (req, res, next) => {
  try {
    const books = await Book.find().populate(['author', 'category', ]);

    books.forEach(book => {
      if(book.review.length !== 0)
        book.populate('review')
    })

    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error'});
  }
}