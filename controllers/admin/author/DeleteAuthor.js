const Author = require("../../../model/author");
const Book = require('../../../model/book')
const fs = require('fs');

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const author = await Author.findById(id);
    author.books.forEach(async bk => {
      try {
        await Book.findByIdAndRemove(bk.toString());
      } catch (err) {
        console.log(err);
      }
    })
    try {
      fs.unlinkSync(`./Uploads/Images/Author/${author.img.split('/')[4]}`);
    } catch (error) { }

    const result = await author.deleteOne();
    if (result) {
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}