const Author = require('../../model/author');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require('../../utils/s3');

module.exports = async (req, res, next) => {
  try {


    const authors = await Author.find();

    for (const author of authors) {

      if (author.books.length !== 0) {
        await author.populate('books');
      }

      author.UTCdob = author.dob.toUTCString().substring(0, 16);

      delete author.updatedAt
      delete author.__v

      const getImgCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: author.img
      });

      const getThumbCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: author.thumb
      });

      author.img = await getSignedUrl(s3, getImgCommand, { expiresIn: 120 });
      author.thumb = await getSignedUrl(s3, getThumbCommand, { expiresIn: 120 });

    }

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
}