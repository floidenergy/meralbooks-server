require('dotenv').config();

const { Router } = require('express');

const BookReview = require('../model/bookReview');
const Book = require('../model/book');


const ClientRouter = Router();

// check if the session is valid
// ClientRouter.use((req, res, next) => {
//   if (req.user)
//     next();
//   else
//     res.status(511).json({ message: "no session found" });
// })

// post review 
ClientRouter.put('/review/:id', async (req, res, next) => {



  const book = await Book.findById(req.params.id);

  const data = {
    user: req.user,
    review: req.body.review,
    rate: req.body.rate,
    book: book
  }


  // const data = {...req.body, book: book.id, user: req.user._id};

  try {
    const review = new BookReview(data)


    const result = await review.save();

    if (!result)
      return res.status(501).json({ message: "couldn't save the review" })

    await Book.findByIdAndUpdate(req.params.id, { $push: { review: review } });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next();
  }
})

module.exports = ClientRouter;