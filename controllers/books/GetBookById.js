const Book = require('../../model/book');

module.exports = async (req, res, next) => {
  try{
    const book = await Book.findById(req.params.id).populate(['author']);

    await book.populate(['category'])

    if(book.review.length !== 0)
      await book.populate('review')

    res.status(200).json(book);
    
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}