
const jwtFunctions = require("../utils/jwtFunctions");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied"});
  }

  try {
    const verified = jwtFunctions.verifyToken(token.split(" ")[1]);
    if (!verified) {
      return res.status(401).json({ message: "Invalid token"});
    }
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error: error.message});
  }
};

module.exports = {
    authMiddleware
};