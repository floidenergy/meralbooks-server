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
const UploadCategory = require('../controllers/admin/category/UploadCategory');
const UpdateCategory = require('../controllers/admin/category/UpdateCategory');
const DeleteCategory = require('../controllers/admin/category/DeleteCategory');

// Books Functions
const UploadBook = require('../controllers/admin/books/UploadBook');
const UpdateBook = require('../controllers/admin/books/UpdateBook');
const DeleteBook = require('../controllers/admin/books/DeleteBook');

// Supplies Functions
const setSupplies = require('../controllers/admin/books/supply');
const getSupplies = require('../controllers/admin/books/getSupplies');

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
    console.log(`Admin user: ${req.user}`);
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
router.route('/category')
    .post(UploadCategory)

router.route('/category/:id')
    .delete(DeleteCategory)
    .put(UpdateCategory)

router.route('/supply')
    .get(getSupplies)
    .put(setSupplies)

module.exports = router;