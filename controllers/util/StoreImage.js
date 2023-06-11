const multer = require('multer');
const path = require('path')


module.exports = (_path, fileInput, type) => {


  const bookImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path);
    },
    filename: (req, file, cb) => {
      cb(null, type + "-" + Date.now() + path.extname(file.originalname));
    }
  })

  const bookUpload = multer({ storage: bookImageStorage });

  const uploadImage = (req, res, next) => {
    try {
      // Check your desired conditions here
      // For example, check if the user is authenticated or if certain fields are present in the request


      // If conditions are met, proceed with file upload using Multer
      bookUpload.single(fileInput)(req, res, err => {
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