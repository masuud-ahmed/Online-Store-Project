import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import userVerify from "../Middleware/userVerify.js";

const router = express.Router();

// Get All orders - GET
router.get("/", async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    if (order.length === 0) {
      return res.status(404).json({ error: "order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by product - GET
router.get("/:id", async (req, res) => {
  try {
    const order = await prisma.order.findMany({where: {productId: Number(req.params.id)},});
    if (order.length === 0) {
      return res.status(404).json({ error: "order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order - POST
router.post("/cartItem", userVerify, async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params;

    const order = await prisma.orderItem.create({
      data: {
        ...req.body,
        userId, 
        productId: Number(id)
      },
    });

    if (!order) {
      return res.status(404).json({ error: "order not created" });
    }

    res
      .status(200)
      .json({ status: 200, message: "order created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order - PUT
router.put("/:id/:orderId", userVerify, async (req, res) => {
  try {
    const userId = req.user.id
    const { orderId, id } = req.params;

    const order = await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        ...req.body,
        userId, 
        productId: Number(id)
      },
    });

    if (!order) {
      return res.status(404).json({ error: "not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "order updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order - DELETE
router.delete("/:orderId", async (req, res) => {
  
  try {
    const { orderId} = req.params;

    const order = await prisma.order.delete({
      where: { id: Number(orderId) },
    });

    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;