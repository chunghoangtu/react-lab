import jwt from "jsonwebtoken";

const ACCESS_SECRET = "access_secret";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};