const fs = require('fs');
const Author = require('../../../model/author');
// const {} = require('../../../Uploads/Images/author')
module.exports = async (req, res, next) => {

  try {

    const data = req.body;
  
    const author = await Author.findById(req.params.id);
    if(req.file){
      if(author.img){
        fs.unlinkSync(`./Uploads/Images/Author/${author.img.split('/')[4]}`)
      }
      author.img = `${process.env.SERVER_LINK}/author/${req.file.filename}`;
    }

    author.name = data.name;
    author.dob = data.dob;
    author.bio = data.bio;

    try {
      await author.save()
      res.status(200).json({ message: "Author Update" });
    } catch (err) {
      console.log(err);
      next({ message: "Couldn't Update Author.", code: 500 });
    }

  } catch (error) {
    next(error)
  }
}