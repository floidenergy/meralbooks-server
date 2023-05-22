const {Schema, model} = require('mongoose');

const subMailSchema = new Schema({
  mail: {
    type: String,
    require: true
  }
})

module.exports = model('subMail', subMailSchema)