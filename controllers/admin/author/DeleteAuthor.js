const Author = require("../../../model/author");
const fs = require('fs');

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const author = await Author.findById(id);
    
    try {
      fs.unlinkSync(`./Uploads/Images/Author/${author.img.split('/')[4]}`);
    }catch (error){}

    const result = await author.deleteOne();
    if(result){
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}