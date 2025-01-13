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

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model ("Child, ChildSchema")