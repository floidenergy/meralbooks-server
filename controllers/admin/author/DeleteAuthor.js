const Author = require("../../../model/author");
const Book = require('../../../model/book');
const {DeleteObjectCommand} = require('@aws-sdk/client-s3');
const s3 = require('../../../utils/s3');

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

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: author.img
    });

    s3.send(deleteCommand);

    // try {
    //   fs.unlinkSync(`./Uploads/Images/Author/${author.img.split('/')[4]}`);
    // } catch (error) { }

    const result = await author.deleteOne();
    if (result) {
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}