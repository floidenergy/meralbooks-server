const {Router} = require('express')
const passport = require('passport')
const router = Router();

router.post("/login", passport.authenticate('admin-local'),(req, res, next) => {
    res.json(req.user);
  })

// books

router.route('/books')
.post(async (req, res, next) => {
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