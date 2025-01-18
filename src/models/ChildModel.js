//Child model represents a child profile 

const mongoose = require("mongoose");

//MongoDB Child Schema
const ChildSchema = new mongoose.Schema({

    childName: {
        type: String,
        required: [true, 'Child name is missing.'],
    },

    dob: {
        type: Date,
        required: [true, 'Date of birth is missing.'],
    },

    dueDate: {
        type: Date,
        required:[true, 'Due date is missing'],
    },
    
    isPremature: {
        type: Boolean,
        required: true,
        default: false,
    },

    weightAtBirth: {
        type: Number, // Weight in kilograms 3.6 for 3.6kg
        required: [true, "Weight at birth is missing."],
    },

    heightAtBirth: {
        type: Number, // Height in centimetres 48 for 48cm
        required: [true, "Height at birth is missing."],
    },
    headCircumferenceAtBirth: {
        type: Number, //Head circumference in centimetres 35 for 35cm
        required: [true, "Head circumference at birth missing."],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    //include permission and createdBy 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //For user who created the profile, by default this is admin
        required: true,
    },
    permissions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            role: { type: String, enum: ["view", "edit", "admin"], required: true },
        },
    ],
});

module.exports = mongoose.model ("Child", ChildSchema)