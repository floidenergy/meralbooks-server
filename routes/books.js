const {Router} = require('express');
const Book = require('../model/book');

const router = Router();

router.route('/')
    .post(async (req, res, next) => {
        const data = req.body;
        const book = new Book({
            name: data.name,
            quantity: data.quantity,
            author: data.author,
            price: data.price
        })

        const status = book.save();

        if(!status)
            return res.status(500).json({message: "Couldn't add A new Book"});

        res.status(200).json({message: "Success"})


    });


module.exports = router;