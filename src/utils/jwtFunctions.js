//Token generation and validation

const jwt = require("jsonwentoken");

const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        ( expiresIn: "3h")
    );
};

const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};


module.exports = {
    generateToken,
    verifyToken,
};