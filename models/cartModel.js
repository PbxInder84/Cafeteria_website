import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  paymentMethod: { type: String },
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;  // Use ESM export
