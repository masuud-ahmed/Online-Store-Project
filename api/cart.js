import express from "express";
import prisma from "./lib/index.js";
import userVerify from "../Middleware/userVerify.js";
const router = express.Router();
 
router.post("/:id", userVerify, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
        });
        if (!product) {
            return res.status(404).json({ status: 404, message: "Product not found" });
        }
        const newCart = await prisma.cart.create({
            data: {
                userId,
                productId: product.id
            },
        });
        if (!newCart) {
            return res.status(404).json({ error: "Cart not created" });
        }
        res.status(201).json({ status: 201, message: "Cart created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
router.get("/", userVerify, async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await prisma.cart.findMany({
            where: { userId: userId },
            include: { product: true },
        });
        if (cartItems.length === 0) {
            return res.status(404).json({ status: 404, message: "Cart items not found" });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;