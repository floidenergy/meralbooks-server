const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3 = require('../../utils/s3')

const { preprareUser } = require('./UserUtils')

const PrepareBook = async (bookData) => {
  let book = bookData

  // populate reviews
  if (book.review?.length !== 0) {
    await book.populate('review')
    await book.populate({
      path: "review",
      populate: {
        path: "user",
        model: 'User'
      }
    })


    book.review = book.review.map(async review => {
      review.user = preprareUser(review.user);
      return review
    })
  }

  // setup book rating points (out of 5)
  let rating = 0;
  book.review.forEach(review => rating += review.rate)
  book.rating = (rating / book.review.length).toFixed(2)


  await book.populate('genre') // populate book genre


  // creating the images Link
  const getBookImgCommand = new GetObjectCommand({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: book.img
  })

  const getBookThumbCommand = new GetObjectCommand({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: book.thumb
  })

  const getAuthorImgCommand = new GetObjectCommand({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: book.author.img
  })

  const getAuthorThumbCommand = new GetObjectCommand({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: book.author.thumb
  })

  book.img = await getSignedUrl(s3, getBookImgCommand, { expiresIn: 120 });
  book.thumb = await getSignedUrl(s3, getBookThumbCommand, { expiresIn: 120 });
  book.author.img = await getSignedUrl(s3, getAuthorImgCommand, { expiresIn: 120 });
  book.author.thumb = await getSignedUrl(s3, getAuthorThumbCommand, { expiresIn: 120 });

  return book
}

module.exports = { PrepareBook }