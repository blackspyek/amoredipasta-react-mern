import jwt from "jsonwebtoken";
const { verify } = jwt;
import { UNAUTHORIZED } from "../constants/httpStatus.js";

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token)
    return res.status(UNAUTHORIZED).json({ message: "Access denied" });
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: "Invalid token" });
  }

  return next();
};
