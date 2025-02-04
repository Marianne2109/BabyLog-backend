//User model, represents any user of the app

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define MongoDB User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is missing.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
    },
    
    firstName: {
        type: String,
        required: [true, 'First name is missing.'],
        minlength: [2, 'First name must be at least two characters.']
    },
    
    lastName: {
        type: String,
        required: [true, 'Last name is missing.'],
        minlength: [2, 'Last name must be at least two characters.']
    },    
    
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        minlength: [8, 'Password must contain at least 8 characters.']
    },
  
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,        

});

//Add pre-save hook to hash the password
UserSchema.pre(
    'save',
    async function(next) {
    //Hash new password or if modified
    if (!this.isModified('password')) return next();

    try {
      console.log("Original password:", this.password);
      this.password = await bcrypt.hash(this.password, 10); 
      console.log("Hashed password:", this.password);
      next();
    } catch(error) {
        console.error("Error hashing password:", error.message);
        next(error);
    }
});

//Define model based on the schema
const User = mongoose.model("User", UserSchema);


module.exports = User;