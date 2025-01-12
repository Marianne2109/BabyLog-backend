//Role middleware - check user role to access routes
const { Role } = require("../models/RoleModel");

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        console.log("User Role: ${userRole}, Required Role: ${requiredRole}");

        if(userRole !== requiredRole) {
            console.log("Access Denied");
            return res.status(403).json({ message: "Access denied" });
        }

        console.log("Access granted");
        next();
    };
};

module.exports = {
    roleMiddleware
};

