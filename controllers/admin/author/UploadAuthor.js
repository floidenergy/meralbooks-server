const fs = require('fs');
const Author = require('../../../model/author');

module.exports = async (req, res, next) => {

  try {

    const data = req.body;

    const newAuthor = new Author({
      img: `${process.env.SERVER_LINK}/author/${req.file.filename}`,
      name: data.name,
      bio: data.bio,
      dob: new Date(data.dob)
    });

    try {
      await newAuthor.save();
      res.status(200).json({ message: "Author Added" });
    } catch (err) {
      console.log(err);
      fs.unlinkSync(req.file.path)
      next({ message: "Couldn't add A new Author", code: 500 });
    }

  } catch (error) {
    next(error)
  }
}