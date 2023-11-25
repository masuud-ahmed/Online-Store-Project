import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import userVerify from "../Middleware/userVerify.js";
import adminVerify from "../Middleware/adminVerify.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post
router.post("/", adminVerify, async (req, res) => {
  try {
    const { name, description, price, stock_quantity } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock_quantity,
        adminId: req.admin.id,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not created" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", adminVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock_quantity } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        description,
        stock_quantity,
        adminId: req.admin.id,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", adminVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
