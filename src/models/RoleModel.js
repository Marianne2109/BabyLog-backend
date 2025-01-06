//Role model to support functionality of giving access to other users

const mongoose = require("mongoose");

//Define Role Schema
const RoleSchema = new mongoose.Schema({
    //main user
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child", 
        required: true,
    },

    role: {
        type: String,
        enum: ['parent', 'caregiver'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Define model based on the schema
const Role = mongoose.model("Role", RoleSchema);

module.exports = {
    Role
}