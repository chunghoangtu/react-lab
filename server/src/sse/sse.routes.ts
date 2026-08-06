import { Router } from "express";

const router = Router();

const colors = ["red", "green", "blue", "yellow", "cyan", "pink"];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

router.get("/currentTime", (_, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  // res.write("data: Hello Client\n\n");
  // res.write("data: How are you?\n\n");

  const timerInterval = setInterval(() => {
    // using default type: "message"
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);

    // specify type of event as "color"
    res.write(`event: color\ndata: ${getRandomColor()}\n\n`);
  }, 2000);

  res.on("close", () => {
    clearInterval(timerInterval);
  });
});

export default router;
