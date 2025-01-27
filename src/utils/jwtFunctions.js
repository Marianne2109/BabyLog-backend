//Token generation and validation

const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: "3h"}
    );
};

const verifyToken = (token) => {
    if (!token) {
        throw new Error("jwt must be provided");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}
    // try {
    //   return jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //     console.error("Token verification failed:", error.message);
    //     return null;
    // }
// };


module.exports = {
    generateToken,
    verifyToken,
};