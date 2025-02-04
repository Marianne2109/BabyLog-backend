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

module.exports = {
    generateToken,
    verifyToken,
};