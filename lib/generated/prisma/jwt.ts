import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "#b@@kapp";

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  }  catch (error: unknown) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
  

