const fs = require('fs');
const path = require('path')
const sharp = require('sharp');
const { DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')

const s3 = require('../../../utils/s3');
const Author = require('../../../model/author');

module.exports = async (req, res, next) => {

  try {

    const data = req.body;

    /**
     * @old_img : Author-1690371947960.jpg
     */

    const author = await Author.findById(req.params.id);
    if (req.file) {
      if (author.img != undefined) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.CYCLIC_BUCKET_NAME,
          Key: author.img
        });
        s3.send(deleteCommand);
      }
      
      //upload img into aws.s3 bucket
      author.img = "Author" + "-" + Date.now() + path.extname(req.file.originalname);

      const imgBuffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "cover"}).toBuffer();

      const putCommand = new PutObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Body: imgBuffer,
        Key: author.img
      })
      
      s3.send(putCommand);
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