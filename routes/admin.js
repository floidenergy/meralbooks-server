const { Router } = require('express')
const passport = require('passport')
const multer = require('multer')
const path = require('path')

const router = Router();

const StoreImage = require('../controllers/util/StoreImage')

// Authors Functions
const UploadAuthor = require('../controllers/admin/author/UploadAuthor');
const UpdateAuthor = require('../controllers/admin/author/UpdateAuthor');
const DeleteAuthor = require('../controllers/admin/author/DeleteAuthor');

// Categories Functions
const Uploadgenre = require('../controllers/admin/genre/UploadGenre');
const Updategenre = require('../controllers/admin/genre/UpdateGenre');
const Deletegenre = require('../controllers/admin/genre/DeleteGenre');

// Books Functions
const UploadBook = require('../controllers/admin/books/UploadBook');
const UpdateBook = require('../controllers/admin/books/UpdateBook');
const DeleteBook = require('../controllers/admin/books/DeleteBook');

// Supplies Functions
const setSupplies = require('../controllers/admin/supply/uploadSupply');
const getSupplies = require('../controllers/admin/supply/getSupplies');
const getSuppliesById = require('../controllers/admin/supply/getSuppliesById');

router.post("/login", passport.authenticate('admin-local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), (req, res, next) => {

    const user = {
        id: req.user.id,
        name: {
            fName: req.user.name.fName,
            lName: req.user.name.lName
        },
        username: req.user.username,
        email: req.user.email,
        info: req.user.email,
        profilePic: req.user.profilePic,
        info: req.user.info
    }
    res.status(200).json(user);
})

// Cheking For The Authentification
router.use((req, res, next) => {
    if (!req.user) {
        return res.sendStatus(511)
    }

    if (!req.user.isAdmin) {
        return res.status(403);
    } else {
        next();
    }
})

// Books
router.route('/book')
    .post(StoreImage("./Uploads/images/book", 'bookPicture', "Book"), UploadBook);

router.route('/book/:id')
    .put(StoreImage("./Uploads/images/book", 'bookPicture', "Book"), UpdateBook)
    .delete(DeleteBook);

// Authors
router.route('/author')
    .post(StoreImage("./Uploads/images/author", "authorImage", 'Author'), UploadAuthor)

router.route('/author/:id')
    .put(StoreImage("./Uploads/Images/author", 'authorImage', "Author"), UpdateAuthor)
    .delete(DeleteAuthor)

// Categories
router.route('/genre')
    .post(Uploadgenre)

router.route('/genre/:id')
    .delete(Deletegenre)
    .put(Updategenre)

router.route('/supply')
    .get(getSupplies)
    .put(setSupplies)

router.route('/supply/:id')
    .get(getSuppliesById);

module.exports = router;