const { Router } = require('express')
const passport = require('passport')
const multer = require('multer')
const path = require('path')

const router = Router();

const { UploadBook, StoreImage } = require('../controllers/admin/books/UploadBook')

router.post("/login", passport.authenticate('admin-local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), (req, res, next) => {
    // TODO: structure the data to send into the client side
    console.log(req.session);
    res.status(200).json(req.user);
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Specify the destination directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Route to handle image upload
router.post('/test', upload.single('file'), (req, res) => {
    res.json({ message: 'Image uploaded successfully' });
});


// books
router.route('/books')
    .post(StoreImage, UploadBook);


module.exports = router;