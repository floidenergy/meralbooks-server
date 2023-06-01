
const multer = require('multer');


const bookImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images/books');
  },
  filename: (req, file, cb) => {
    cb(null, new Date.now() + path.extname(file.originalname));
  }
})

const bookUpload = multer({ storage: bookImageStorage });


module.exports.UploadBook = async (req, res, next) => {
  if(!req.user.isAdmin)
    return res.status(403)

  // console.log(req.user);

  // const data = req.body;
  // console.log(req.file);

  // console.log(req.body);
  // res.send("Success");
  // const book = new Book({
  //     name: data.name,
  //     quantity: data.quantity,
  //     author: data.author,
  //     price: data.price
  // })

  // const status = book.save();

  // if(!status)
  //     return res.status(500).json({message: "Couldn't add A new Book"});

  res.status(200).json({ message: "Success" });

}