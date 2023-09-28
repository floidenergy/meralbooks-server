const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  books: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }]
  }
},
  {
    timestamps: true
  });

module.exports = model('Author', authorSchema);