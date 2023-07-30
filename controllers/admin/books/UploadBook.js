const sharp = require('sharp');
const path = require('path');
const {PutObjectCommand} = require('@aws-sdk/client-s3');

const Book = require('../../../model/book');
const Author = require('../../../model/author');
const s3 = require('../../../utils/s3');

module.exports = async (req, res, next) => {
  try {

    const data = req.body;

    const imgBuffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "cover"}).toBuffer();
    const imgName = "Book" + "-" + Date.now() + path.extname(req.file.originalname);

    const putCommand = new PutObjectCommand({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Body: imgBuffer,
      Key: imgName
    });

    s3.send(putCommand);

    const book = new Book({
      img: imgName,
      name: data.name,
      description: data.description,
      author: data.author,
      price: data.price,
      language: data.language,
      category: data.category,
      price: data.price
    })

    await book.save();
    await Author.findByIdAndUpdate(data.author, {$push: {books: book._id}});
    res.status(200).json({ message: "Book Added" });
  } catch (err) {
    console.log(err);
    fs.unlinkSync(req.file.path)
    return res.status(400).json({ message: 'error happend' });
  }
}