
const Author = require('../../../model/author');
const path = require('path')
const sharp = require('sharp')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

const s3 = require('../../../utils/s3');

module.exports = async (req, res, next) => {

  try {

    const data = req.body;

    const filename = Date.now() + ".jpeg";
    const imageConfig = { quality: 60 }

    const imgName = "Author-Image-" + filename;
    const thumbName = "Author-thumb-" + filename;

    const imgBuffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: "cover" })
      .flatten({ background: '#ffffff' })
      .jpeg(imageConfig)
      .toBuffer();

    const thumbBuffer = await sharp(req.file.buffer)
      .resize({ height: 266, width: 150, fit: "cover" })
      .flatten({ background: '#ffffff' })
      .jpeg(imageConfig)
      .toBuffer();

    const imgPutCommand = new PutObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Body: imgBuffer,
      Key: imgName
    });

    const thumbPutCommand = new PutObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Body: thumbBuffer,
      Key: thumbName
    });

    await s3.send(imgPutCommand);
    await s3.send(thumbPutCommand);

    const newAuthor = new Author({
      img: imgName,
      thumb: thumbName,
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