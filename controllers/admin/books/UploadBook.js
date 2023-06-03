
const multer = require('multer');
const Book = require('../../../model/book')

const bookImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    cb(null, new Date.now() + path.extname(file.originalname));
  }
})

const bookUpload = multer({ storage: bookImageStorage });

module.exports.bookUpload = 
module.exports.StoreImage = (req, res, next) => {
  // Check your desired conditions here
  // For example, check if the user is authenticated or if certain fields are present in the request
  if(!req.user.isAdmin)
    return res.status(403)

  // If conditions are met, proceed with file upload using Multer
  bookUpload.single('bookPicture')(req, res, err => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred during file upload
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Other error occurred
      return res.status(500).json({ error: err.message });
    }

    // No error, continue with the next middleware/route handler
    next();
  });
};

module.exports.UploadBook = async (req, res, next) => {
  
  if(!req.user.isAdmin)
    return res.status(403)

    console.log(req.body);
// next();



  const data = req.body;
  console.log(req.file);

  // console.log(req.body);
  // next();
  // // res.send("Success");
  // const book = new Book({
  //     name: data.name,
  //     quantity: data.quantity,
  //     author: data.author,
  //     price: data.price
  // })

  // const status = await book.save();

  // if(!status)
  //     return res.status(500).json({message: "Couldn't add A new Book"});

  res.status(200).json({ message: "Book Added" });

}