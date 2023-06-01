const { Router } = require('express')
const passport = require('passport')
const path = require('path')

const router = Router();

const { UploadBook } = require('../controllers/admin/books/UploadBook')

router.post("/login", passport.authenticate('admin-local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), (req, res, next) => {
    // TODO: structure the data to send into the client side
    console.log(req.session);
    res.status(200).json(req.user);
})

// router.post('/login', (req, res, next) => {
//     res.cookie('testCookie', "52214796", {maxAge: 9000000, httpOnly: true});
//     res.sendStatus(200);
// })

// router.post('/login', passport.authenticate('admin-local', (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//     req.login(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.json(req.user);
//     });
//   }), (req, res, next) => {
//         // TODO: structure the data to send into the client side
//         console.log(req.session);
//         res.status(200).json(req.user);
//     })


// books
router.route('/books')
    .post(UploadBook);


module.exports = router;