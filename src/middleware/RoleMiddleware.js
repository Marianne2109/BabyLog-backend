//Role middleware - check user role to access routes

const roleLevels = {
  view: 1,
  edit: 2,
  admin: 3,
};

const roleMiddleware = (requiredRole) => async (req, res, next) => {
  const { child } = req.params; 
  const userId = req.user.id; //user authenticated

  try {
    console.log('Checking role for user:', userId, child);

    //Verify that the child exists before validation
    const childExists = await Child.findById(child);
    if (!childExists) {
      console.log("Child profile not found:", child);
      return res.status(404).json({ message: "Child profile not found." });
  }

    
    //Check that the user role for a specific child
    const role = await Role.findOne({ assignedTo: userId, child });
    if (!role) {
      console.log("User has no role for this child");
      return res.status(404).json({ message: "Access denied." });
  }

    //Compare role levels
    if (roleLevels[role.role] < roleLevelsP[requiredRole]) {
      console.log("Access denied: insufficient permissions");
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