const Supplies = require("../../../model/supply");
const Books = require('../../../model/book');

module.exports = async (req, res, next) => {
  const items = req.body;

  try {
    await items.forEach(async item => {
      await Books.findByIdAndUpdate(item.book.value, { $inc: { quantity: item.quantity } })
    });

    const newSupply = new Supplies({
      userAdmin: req.user._id,
      items: items.map(item => ({ book: item.book.value, quantity: item.quantity })
      )
    })
    await newSupply.save();
    res.sendStatus(200)
  } catch (err) {
    console.log("supply error");
    console.log(err);
    res.sendStatus(500);
  }
}