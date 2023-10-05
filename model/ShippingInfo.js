const { Schema, model } = require('mongoose');

const ShippingInfoSchema = new mongoose.Schema({
  address: {
    type: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      }
    },
    required: true
  },
  phone: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

module.exports = model('ShippingInfo', addressSchema);