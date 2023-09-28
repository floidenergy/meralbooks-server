const path = require('path')
const sharp = require('sharp');
const { DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')

const s3 = require('../../../utils/s3');
const Author = require('../../../model/author');

module.exports = async (req, res, next) => {

  try {

    const data = req.body;



    const author = await Author.findById(req.params.id);
    if (req.file) {
      if (author.img != undefined) {
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
      }

      //upload img into aws.s3 bucket
      const filename = Date.now() + ".jpeg";
      const imageConfig = { quality: 60 }

      author.img = "Author-Image-" + filename;
      author.thumb = "Author-Thumb-" + filename;

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
        Key: author.img
      })

      const thumbPutCommand = new PutObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Body: thumbBuffer,
        Key: author.thumb
      })

      await s3.send(imgPutCommand);
      await s3.send(thumbPutCommand);
    }


    author.name = data.name;
    author.dob = data.dob;
    author.bio = data.bio;

    try {
      await author.save()
      res.status(200).json({ message: "Author Update" });
    } catch (err) {
      console.log(err);
      next({ message: "Couldn't Update Author.", code: 500 });
    }

  } catch (error) {
    next(error)
  }
}