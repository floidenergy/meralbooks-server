const multer = require('multer');
const path = require('path')
const fs = require('fs')

module.exports = (_path, fileInput, type) => {


  // const Storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     fs.mkdirSync(_path, {recursive: true})
  //     cb(null, _path);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, type + "-" + Date.now() + path.extname(file.originalname));
  //   }
  // })

  const Storage = multer.memoryStorage();

  const uploadPic = multer({ storage: Storage });

  const uploadImage = (req, res, next) => {
    try {

      // If conditions are met, proceed with file upload using Multer
      uploadPic.single(fileInput)(req, res, err => {
        if (err instanceof multer.MulterError) {
          // Multer error occurred during file upload
          // return res.status(400).json({ error: err.message });
          next(err)
        } else if (err) {
          // Other error occurred
          // return res.status(500).json({ error: err.message });
          next(err)
        }


        next();
        // No error, continue with the next middleware/route handler
      });
    } catch (error) {
      next(error)
    }
  };

  return uploadImage;
}