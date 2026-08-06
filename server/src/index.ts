// const express = require("express");
// const http = require("http");
// const cors = require("cors"); // 1. Require thư viện cors
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./auth/auth.routes.ts";
import { authMiddleware } from "./auth/auth.middleware.ts";
import { socketAuth } from "./socket/socket.middleware.ts";
import { registerSocket } from "./socket/socket.ts";
import sseRoutes from "./sse/sse.routes.ts";

import './graphql/apolloServer.ts'

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8080;

const corsConfig = {
  origin: [
    "http://localhost:5173", // Port của ứng dụng Web Vite
    "http://127.0.0.1:5173",
    "http://localhost:4173", // Port của ứng dụng Web Vite
    "http://127.0.0.1:4173",
  ],
  credentials: true, // Bật nếu bạn có gửi kèm Cookie hoặc Header định danh
};

app.use(cors(corsConfig));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { ...corsConfig, methods: ["GET", "POST"] },
});
io.use(socketAuth);
registerSocket(io);

app.get("/", (_, res) => {
  res.send("Hello from Chat server!");
});

app.get("/testResponse", (_, res) => {
  res.json({
    body: {
      message: "here is some data!",
    },
  });
});

const todos: string[] = ['todo 1'];

app.get("/todos", (_, res) => {
  res.json({
    todos: todos,
  });
});

app.patch("/todos", (req, res) => {
  const newTodo = req.body.todo;
  if (!newTodo || typeof newTodo !== "string") {
    return res.status(400).json({ error: "Invalid todo value!" });
  }

  todos.push(newTodo);

  // Trả về kết quả sau khi cập nhật thành công
  res.status(200).json({
    message: "Todo added!",
    data: todos,
  });
});

app.use("/auth", authRoutes);

app.use("/sse", authMiddleware, sseRoutes);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
