import express from "express";

import userRouter from "./User.js";
import adminRouter from "./admin.js";
import productRouter from "./product.js"
import cartRouter from './cart.js'
import viewRouter from './review.js'

const server = express();

server.use(express.json());

server.use("/api/users", userRouter)
server.use("/api/admins", adminRouter)
server.use("/api/products", productRouter)
server.use("/api/carts", cartRouter )
server.use('/api/review', viewRouter)

export default server;