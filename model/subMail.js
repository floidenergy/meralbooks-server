const {Schema, model} = require('mongoose');

const subMailSchema = new Schema({
  mail: {
    type: String,
    required: true
  }
},
{
    timestamps: true
})

module.exports = model('subMail', subMailSchema)