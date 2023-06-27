const {Schema, model, Types} = require('mongoose')

const suppliesSchema = new Schema({
  userAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items:{
    type: [{
      book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  }
},{
  timestamps: true
});

module.exports = model('Supplies', suppliesSchema);