import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    // Check if the product already exists in the cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex >= 0) {
      // If the product already exists, update the quantity
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });
    }

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } else {
    // If no cart exists, create a new one
    const newCart = new Cart({
      user: userId,
      cartItems: [
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        },
      ],
    });

    await newCart.save();
    res.status(201).json(newCart);
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming the user is authenticated
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Filter out the product from the cart
  cart.cartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.status(200).json(cart);
});

// @desc    Clear all items from cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming the user is authenticated

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.cartItems = [];
  await cart.save();
  res.status(200).json(cart);
});

// @desc    Save shipping address to the cart
// @route   POST /api/cart/shipping
// @access  Private
export const saveShippingAddress = asyncHandler(async (req, res) => {
  const { address, city, postalCode, country } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Save the shipping address to the cart
  cart.shippingAddress = {
    address,
    city,
    postalCode,
    country,
  };

  await cart.save();
  res.status(200).json(cart);
});

// @desc    Save payment method to the cart
// @route   POST /api/cart/payment
// @access  Private
export const savePaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Save the payment method to the cart
  cart.paymentMethod = paymentMethod;

  await cart.save();
  res.status(200).json(cart);
});

// @desc    Get cart details
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming the user is authenticated

  const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json(cart);
});
