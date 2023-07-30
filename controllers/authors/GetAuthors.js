const Author = require('../../model/author');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require('../../utils/s3');

module.exports = async (req, res, next) => {

  const authors = await Author.find();

  for(const author of authors){

    if (author.books.length !== 0) {
      await author.populate('books');
    }

    author.UTCdob = author.dob.toUTCString().substring(0, 16);

    delete author.updatedAt
    delete author.__v
    
    const getCommand = new GetObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: author.img
    });

    const img = await getSignedUrl(s3, getCommand, {expiresIn: 120});

    author.img = img;
  }

  res.status(200).json(authors);
}