import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import adminVerify from "../Middleware/adminVerify.js";
const SECTRET_KEY = "secret"

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingadmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (existingadmin) {
      return res
        .status(409)
        .json({ status: 409, message: "admin already exists" });
    }

    const hashePassword = await bcrypt.hash(password, 10);

    const newadmin = await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hashePassword,
      },
    });

    res
      .status(201)
      .json({ status: 201, message: "admin created successFully", newadmin });
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
    const existingadmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingadmin) {
      return res.status(404).json({ status: 404, message: "admin not found" });
    }

    const isCorrectPassword = bcrypt.compare(password, existingadmin.password);

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ status: 401, message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: existingadmin.id, email: existingadmin.email },
      SECTRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ status: 200, message: "admin logged in successfully", token });
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
    const admins = await prisma.admin.findMany()

    if(admins.length === 0) {
      return res.status(404).json({status: 200, message: "admins not found"})
    }

    res.status(200).json(admins)
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
})

router.get("/admin", adminVerify , async (req, res) => {
  try {
    const adminId = req.admin.id
    console.log("id:", adminId)
    
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if(!admin) {
      return res.status(404).json({status: 200, message: "admin not found"})
    }

    res.status(200).json(admin)
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
})


export default router;