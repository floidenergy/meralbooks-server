const Supplies = require('../../../model/supply');

module.exports = async (req, res, next) => {
  const supplies = (await Supplies.find({ createdAt: { $gt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)) } }).populate(['userAdmin'])).map(supply => {
    supply.userAdmin = { _id: supply.userAdmin._id, username: supply.userAdmin.username, name: supply.userAdmin.name }
    return supply
  });
  res.status(200).json([])
  // res.status(200).json(supplies);
}