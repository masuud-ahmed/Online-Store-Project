 // Setup Sign up and Login API for user
import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const SECTRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existinguser) {
      return res
        .status(409)
        .json({ status: 409, message: "user already exists" });
    }

    const hashePassword = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashePassword,
      },
    });

    res
      .status(201)
      .json({ status: 201, message: "user created successFully", newuser });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existinguser) {
      return res.status(404).json({ status: 404, message: "user not found" });
    }

    const isCorrectPassword = bcrypt.compare(password, existinguser.password);

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ status: 401, message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: existinguser.id, email: existinguser.email },
      SECTRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ status: 200, message: "user logged in successfully", token });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default router;