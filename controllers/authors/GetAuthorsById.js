const Author = require('../../model/author');

module.exports = async (req, res, next) => {
  try {
    const { _id, img, name, bio, dob, books } = await Author.findById(req.params.id);
    res.status(200).json({ _id, img, name, bio, dob: dob, UTCdob: dob.toUTCString().substring(0, 16), books })
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Author Not Found" });
  }
}