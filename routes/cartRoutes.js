import express from 'express';
import {
  addToCart,
  removeFromCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
  getCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add item to cart
router.post('/', protect, addToCart);

// Remove item from cart
router.delete('/:id', protect, removeFromCart);

// Clear all items from cart
router.delete('/', protect, clearCart);

// Save shipping address
router.post('/shipping', protect, saveShippingAddress);

// Save payment method
router.post('/payment', protect, savePaymentMethod);

// Get current user's cart
router.get('/', protect, getCart);

export default router;
