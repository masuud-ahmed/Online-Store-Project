import express from "express";

import userRouter from "./User.js";
const server = express();

server.use(express.json());

server.use("/api/users", userRouter)

export default server;