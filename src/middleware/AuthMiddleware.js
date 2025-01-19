
const jwtFunctions = require("../utils/jwtFunctions");

const authMiddleware = (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Access denied"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    console.log("Decoded token:", decoded);
    next();
  } catch (error) {
    console.error("Token validation failed:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
  };


  // try {
  //   const verified = jwtFunctions.verifyToken(token.split(" ")[1]);
  //   if (!verified) {
  //     return res.status(401).json({ message: "Invalid token"});
  //   }
  //   req.userId = verified.userId;
  //   next();
  // } catch (error) {
  //   res.status(400).json({ message: "Invalid request", error: error.message});
  // }
// };

module.exports = {
    authMiddleware
};