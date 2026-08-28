import { Socket } from "socket.io";

import { verifyAccessToken } from "../auth/jwt.ts";
const getCookie = (cookieHeader: string, name: string) => {
  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");

    if (key === name) {
      return value;
    }
  }

  return undefined;
};

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie ?? "";

    const token = getCookie(cookieHeader, "accessToken");

    console.log(3, token);
    if (!token) {
      console.log(4);
      return next(new Error("Unauthenticated"));
    }

    const payload = verifyAccessToken(token);

    socket.data.user = payload;

    next();
  } catch {
    console.log("socketAuth called failed");

    console.log(socket.handshake.headers.cookie);
    return next(new Error("Invalid token"));
  }
};
