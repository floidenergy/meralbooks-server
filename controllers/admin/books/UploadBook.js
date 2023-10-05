const sharp = require('sharp');
const path = require('path');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const Book = require('../../../model/book');
const Author = require('../../../model/author');
const s3 = require('../../../utils/s3');

module.exports = async (req, res, next) => {
  try {

    const data = req.body;

    const fileName = Date.now() + ".jpeg";
    const imageConfig = { quality: 60, }

    const imgBuffer = await sharp(req.file.buffer)
      .resize({ height: 1200, width: 675, fit: "cover" })
      .flatten({ background: "#ffffff" })
      .jpeg(imageConfig)
      .toBuffer();
    // const imgName = "Book" + "-" + Date.now() + path.extname(req.file.originalname);
    const imgName = "Book-" + fileName;

    const thumbBuffer = await sharp(req.file.buffer)
      .resize({ height: 266, width: 150, fit: "cover" })
      .flatten({ background: '#ffffff' })
      .jpeg(imageConfig)
      .toBuffer();
    const thumbName = "BookThumb-" + fileName;

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

    const book = new Book({
      img: imgName,
      thumb: thumbName,
      name: data.name,
      description: data.description,
      author: data.author,
      price: data.price,
      language: data.language,
      genre: data.genre,
      price: data.price
    })

    await book.save();
    await Author.findByIdAndUpdate(data.author, { $push: { books: book._id } });
    res.status(200).json({ message: "Book Added" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'error happend' });
  }
}