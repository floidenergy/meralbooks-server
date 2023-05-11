const {Router} = require('express');
const Book = require('../model/book');
const multer = require('multer');

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../Images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.route('/books')
    .post(upload.single("bookPicture"), async (req, res, next) => {
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

        res.status(200).json({message: "Success"})


    });


module.exports = router;