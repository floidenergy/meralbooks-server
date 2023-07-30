
const Author = require('../../../model/author');
const path = require('path')
const sharp = require('sharp')
const {PutObjectCommand} = require('@aws-sdk/client-s3')

const s3 = require('../../../utils/s3');

module.exports = async (req, res, next) => {

  try {

    const data = req.body;
    const imgBuffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "cover"}).toBuffer();
    const imgName = "Author" + "-" + Date.now() + path.extname(req.file.originalname);

    const putCommand = new PutObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Body: imgBuffer,
      Key: imgName
    });

    await s3.send(putCommand);

    const newAuthor = new Author({
      img: imgName,
      name: data.name,
      bio: data.bio,
      dob: new Date(data.dob)
    });

    try {
      await newAuthor.save();
      res.status(200).json({ message: "Author Added" });
    } catch (err) {
      console.log(err);
      next({ message: "Couldn't add A new Author", code: 500 });
    }

  } catch (error) {
    next(error)
  }
}