const path = require('path');
const sharp = require('sharp');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = require('../../../utils/s3');

const Author = require('../../../model/author');
const Book = require('../../../model/book');

module.exports = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);


    if (req.file) {
      let imgName;
      let thumbName;

      const imgDeleteCommand = new DeleteObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.img
      });

      const thumbDeleteCommand = new DeleteObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: book.thumb
      })

      const fileName = Date.now() + ".jpeg";
      const imageConfig = { quality: 60 }

      imgName = "Book-" + fileName;
      const imgBuffer = await sharp(req.file.buffer)
        .resize({ height: 1200, width: 675, fit: "cover" })
        .flatten({ background: '#ffffff' })
        .jpeg(imageConfig)
        .toBuffer();

      thumbName = "BookThumb-" + fileName;
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

      // it's catching errors here
      s3.send(imgDeleteCommand);
      s3.send(thumbDeleteCommand);
      await s3.send(imgPutCommand);
      await s3.send(thumbPutCommand);


      book.img = imgName;
      book.thumb = thumbName;

    }



    // ||====> **Update book from author** <====||

    // ====> delete book from the first author

    // ====> adding book to the second author
    const author = await Author.findById(req.body.author)
    if (!author.books.some(bk => book._id.toString() === bk.toString())) {
      await Author.findByIdAndUpdate(book.author, { $pull: { books: book._id } });
      author.books.push(book._id);
      await author.save()
    } else {
      console.log('**update book**');
      console.log(`${book.name} is already in ${author.name}`);
    }


    // ||====> edit categories in book <====||
    book.genre = req.body.genre;
    // ||====> edit language Language <====||
    book.language = req.body.language;

    book.author = req.body.author;

    book.name = req.body.name;
    book.price = req.body.price;
    book.description = req.body.description;


    const result = await book.save();

    res.status(200).send('ok');
  } catch (error) {
    next(error);
  }
}