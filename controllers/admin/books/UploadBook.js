const fs = require('fs');
const Book = require('../../../model/book')
const Author = require('../../../model/author')

module.exports = async (req, res, next) => {

  const book = await Book.findOne({ name: 'life of floidus' });
  console.log(book);


  try {

    console.log(req.body);

    const data = req.body;

    const book = new Book({
      img: `${process.env.SERVER_LINK}/book/${req.file.filename}`,
      name: data.name,
      description: data.description,
      author: data.author,
      price: data.price,
      language: data.language,
      category: data.category,
      price: data.price
    })

    await book.save();
    await Author.findByIdAndUpdate(data.author, {$push: {books: book._id}});
    res.status(200).json({ message: "Book Added" });
  } catch (err) {
    console.log(err);
    fs.unlinkSync(req.file.path)
    return res.status(400).json({ message: 'error happend' });
  }
}