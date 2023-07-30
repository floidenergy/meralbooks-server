const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require('../../../utils/s3');
const Supplies = require('../../../model/supply');
const supply = require('../../../model/supply');

module.exports = async (req, res, next) => {
  const supplies = await Supplies.find({ createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)) } })
  
  for(const supply of supplies){
    await supply.populate('userAdmin')
    const {_id, name, username} = supply.userAdmin
    supply.userAdmin = {_id, name, username};
    
    await supply.populate({
      path: `items`,
      populate: {
        path: 'book',
        model: 'Book'
      }
    })
    for(const item of supply.items){
      const getCommand = new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: item.book.img
      });

      item.book.img = await getSignedUrl(s3, getCommand, {expiresIn: 120});
    }
  }

  const userAdmin = supplies.user

  // res.status(200).json([])
  res.status(200).json(supplies);
}