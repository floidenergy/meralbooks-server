const Author = require("../../../model/author");
const Book = require('../../../model/book');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../../../utils/s3');

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const author = await Author.findById(id);

    author.books.forEach(async bk => {
      try {
        // deleting the book img and thumbnail
        const book = await Book.findById(bk.toString());

        const imgDeleteCommand = new DeleteObjectCommand({
          Bucket: process.env.CYCLIC_BUCKET_NAME,
          Key: book.img
        });

        const thumbDeleteCommand = new DeleteObjectCommand({
          Bucket: process.env.CYCLIC_BUCKET_NAME,
          Key: book.thumb
        });

        await s3.send(imgDeleteCommand);
        await s3.send(thumbDeleteCommand);

        // delete the book from database
        await Book.findByIdAndRemove(bk.toString());
      } catch (err) {
        console.log(err);
      }
    })

    const deleteImgCommand = new DeleteObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: author.img
    });

    const deleteThumbCommand = new DeleteObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: author.thumb
    });

    await s3.send(deleteImgCommand);
    await s3.send(deleteThumbCommand);

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