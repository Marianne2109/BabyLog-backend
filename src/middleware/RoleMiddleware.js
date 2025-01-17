//Role middleware - check user role to access routes
const { Role } = require("../models/RoleModel");
const { User } = require("../models/UserModel");
const { Child } = require("../models/ChildModel");

//Verify that the child exists before validation
const childExists = await Child.findById(child);
if (!childExists) {
  return res.status(404).json({ message: "Child profile not found." });
};

//Check that the user exists in the database
const user = await User.findById(userId);
if (!user) {
  return res.status(404).json({ message: "User not found." });
};


const roleMiddleware = (requiredRole) => async (req, res, next) => {
  try {
    const { child } = req.params; 
    const userId = req.user.id; //user authenticated

    console.log("Checking role for user ${userId} on child ${child}");

    //Find user's role for specific child
    const role = await Role.findOne({ assignedTo: userId, child });

    if(!role) {
        console.log("Access denied: User has no role for child:");
        return res.status(403).json({ message: "Access denied." });
    }

    console.log("User role: ${role.role}. Required role: ${requiredRole}");

    if (role.role !== requiredRole) {
        console.log("Acces denied: User does not have the required role");
        return res.status(403).json({ message: "Access denied." });
    }

    if (role.role !== requiredRole) {
        console.log("Access denied: User does not have the required access");
        return res.status(403).json({ message: "Access denied" });
    }

    console.log("Access granted for user:", userId);
    next();
} catch (error) {
    console.error ("Internal error", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
}
};

module.exports = {
    roleMiddleware
};

