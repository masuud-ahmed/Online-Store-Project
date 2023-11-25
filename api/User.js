 import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const SECTRET_KEY = "secret"
import userVerify from "../Middleware/userVerify.js"; 

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
      { id: existinguser.id},
      SECTRET_KEY,
      { expiresIn: "7d" }
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

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    if(users.length === 0) {
      return res.status(404).json({status: 200, message: "users not found"})
    }

    res.status(200).json(users)
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
})

router.get("/currentUser", userVerify, async (req, res) => {
  try {
    const userId = req.user.id
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if(!user) {
      return res.status(404).json({status: 200, message: "user not found"})
    }

    res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
})

export default router;