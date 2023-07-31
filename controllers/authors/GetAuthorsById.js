const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const Author = require('../../model/author');
const s3 = require('../../utils/s3');

module.exports = async (req, res, next) => {
  try {

    const author = await Author.findById(req.params.id);
    // console.log(author);
    if (author.books.length !== 0)
      await author.populate('books')

    // Object.assign(author, {UTCdob: author.dob.toUTCString().substring(0, 16)})
    author.UTCdob = author.dob.toUTCString().substring(0, 16);

    delete author.updatedAt
    delete author.__v

    const getCommand = new GetObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: author.img
    });

    for(const book of author.books){
      const getCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.img
      });
  
      book.img = await getSignedUrl(s3, getCommand, {expiresIn: 120});
    }

    console.log(author);

    author.img = await getSignedUrl(s3, getCommand, { expiresIn: 120 });

    res.status(200).json({ ...author._doc, UTCdob: author.dob.toUTCString().substring(0, 16) })

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Author Not Found" });
  }
}