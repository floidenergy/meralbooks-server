const { Router } = require('express')
const passport = require('passport')
const multer = require('multer')
const path = require('path')

const router = Router();

const StoreImage = require('../controllers/util/StoreImage')

const UploadBook = require('../controllers/admin/books/UploadBook')

// Authors
const UploadAuthor = require('../controllers/admin/author/UploadAuthor')
const UpdateAuthor = require('../controllers/admin/author/UpdateAuthor')
const DeleteAuthor = require('../controllers/admin/author/DeleteAuthor')


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

router.use((req, res, next) => {
    if(!req.user){
        console.log(res.user);
        return res.sendStatus(511)
    }

    if (!req.user.isAdmin){
        return res.status(403);
    }else{
        next();
    }
})

// books
router.route('/book')
    .post(StoreImage("./Uploads/images/book", 'bookPicture', "Book"), UploadBook);

router.route('/author')
    .post(StoreImage("./Uploads/images/author", "authorImage", 'Author'), UploadAuthor)
    // .get(GetAuthors)

router.route('/author/:id')
    .put( StoreImage("./Uploads/Images/author", 'authorImage', "Author"), UpdateAuthor)
    .delete(DeleteAuthor)


module.exports = router;