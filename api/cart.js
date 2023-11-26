import express from "express";
import prisma from "./lib/index.js";
import userVerify from "../Middleware/userVerify.js";

 
const router = express.Router();

// Get Cart
router.get('/', userVerify, async (req, res) => {
  const userId = req.user.id; // Assuming user authentication middleware sets the user ID

    

  const cart =  cart.find((cart) => prisma.cart.userId === userId);

  if (cart) {
    const cartData = {
      id: cart.id,
      userId: cart.userId,
      totalPrice: cart.totalPrice,
    };

    res.status(200).json(cartData);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

// Get Cart Items
router.get('/cartItems', userVerify, async (req, res) => {
  const userId = req.user.id; // Assuming user authentication middleware sets the user ID

  const cart = cart.find((cart) => prisma.cart.userId === userId);

  if (cart) {
    const cartItemData = prisma.cartItem
      .filter((item) => item.cartId === prisma.cart.id)
      .map((item) => {
        return {
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };
      });

    res.status(200).json(cartItemData);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

// Add Item to Cart
router.post('/cartItems', userVerify, async(req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = product.find((product) => prisma.product.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const userId = req.user.id; // Assuming user authentication middleware sets the user ID

  const cart = cart.find((cart) => cart.userId === userId);

  if (!cart) {
    cart = { id: generateUniqueId(), userId, totalPrice: 0 };
    cart.push(cart);
  }

  const cartItem = {
    id: generateUniqueId(),
    cartId: cart.id,
    productId,
    name: product.name,
    price: product.price,
    quantity,
  };

  cartItem.push(cartItem);
  cart.totalPrice += product.price * quantity;

  res.status(201).json(cartItem);
});

// Update Cart Item
router.put('/cartItems/:itemId', async(req, res) => {
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  const cartItem = cartItem.find((item) => item.id === itemId);

  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  cartItem.quantity = quantity;

  res.status(200).json({ message: 'Cart item updated successfully' });
});

// Remove Cart Item
router.delete('/cartIitems/:itemId', async(req, res) => {
  const itemId = req.params.itemId;

  const cartItemIndex = cartItem.findIndex((item) => item.id === itemId);

  if (cartItemIndex === -1) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  const cartItem = cartItem[cartItemIndex];
  const cart = cart.find((cart) => cart.id === cartItem.cartId);

  cart.totalPrice -= cartItem.price * cartItem.quantity;

  cartItem.splice(cartItemIndex, 1);

  res.status(204).json({ message: 'Cart item removed successfully' });
});

// Clear Cart
router.delete('/cartItems', async(req, res) => {
  const userId = req.user.id; // Assuming user authentication middleware sets the user ID

  const cart = cart.find((cart) => cart.userId === userId);

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const cartItemIndexes = cartItem
    .map((item, index) => (item.cartId === cart.id ? index : -1))
    .filter((itemIndex) => itemIndex !== -1);

  cartItemIndexes.forEach((itemIndex) => {
    const cartItem = cartItem[itemIndex];
    cart.totalPrice -= cartItem.price * cartItem.quantity;
  });

  cartItem = cartItem.filter((item, index) => !cartItemIndexes.includes(index));

  res.status(204).json({ message: 'Cart cleared successfully' });
});

export default router;