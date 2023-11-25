import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import userVerify from "../Middleware/userVerify.js";

const router = express.Router();

// Get All Reviews - GET
router.get("/", async (req, res) => {
  try {
    const review = await prisma.review.findMany();
    if (review.length === 0) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get review by product - GET
router.get("/:id", async (req, res) => {
  try {
    const review = await prisma.review.findMany({where: {productId: Number(req.params.id)},});
    if (review.length === 0) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create review - POST
router.post("/:id", userVerify, async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params;

    const review = await prisma.review.create({
      data: {
        ...req.body,
        userId, 
        productId: Number(id)
      },
    });

    if (!review) {
      return res.status(404).json({ error: "review not created" });
    }

    res
      .status(200)
      .json({ status: 200, message: "review created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update review - PUT
router.put("/:id/:reviewId", userVerify, async (req, res) => {
  try {
    const userId = req.user.id
    const { reviewId, id } = req.params;

    const review = await prisma.review.update({
      where: {
        id: Number(reviewId),
      },
      data: {
        ...req.body,
        userId, 
        productId: Number(id)
      },
    });

    if (!review) {
      return res.status(404).json({ error: "not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "review updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete review - DELETE
router.delete("/:reviewId", async (req, res) => {
  
  try {
    const { reviewId} = req.params;

    const review = await prisma.review.delete({
      where: { id: Number(reviewId) },
    });

    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res
      .status(200)
      .json({ status: 200, message: "review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;