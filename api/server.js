import express from "express";

import userRouter from "./User.js";
import adminRouter from "./admin.js";
import productRouter from "./product.js"

const server = express();

server.use(express.json());

server.use("/api/users", userRouter)
server.use("/api/admins", adminRouter)
server.use("/api/products", productRouter)

export default server;