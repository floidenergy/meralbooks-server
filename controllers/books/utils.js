const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3 = require('../../utils/s3')

const PrepareBook = async (bookData) => {
  let book = bookData
  if (book.review?.length !== 0) {
    await book.populate('review')
    await book.populate({
      path: "review",
      populate: {
        path: "user",
        model: 'User'
      }
    })

    // TODO: NEXT => DELETE THE USER SENSITIVE DATA BEFORE SENDING IT
    /**
      email
      confirmedEmail
      isAdmin
      hash
      salt
      privacyToken
      accountHistory
      created_at
      info
      __v
      dob
      shippingInfo
      orderHistory
     */
    
    book.review = book.review.map(async review => {
      // delete review.user.email
      // delete review.user.confirmedEmail
      // delete review.user.isAdmin
      // delete review.user.hash
      // delete review.user.salt
      // delete review.user.privacyToken
      // delete review.user.accountHistory
      // delete review.user.created_at
      // delete review.user.info
      // delete review.user.__v
      // delete review.user.dob
      // delete review.user.shippingInfo
      // delete review.user.orderHistory
      // console.log(review.user);
      delete review._id
      return review
    })

    console.log(book.review);
  }

  await book.populate('genre')

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