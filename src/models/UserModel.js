//User model, represents any user of the app

const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");

//Define MongoDB User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is missing.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
    },
    
    firstName: {
        type: String,
        required: [true, 'First name is missing.'],
        unique: false,
        trim: true,
        minlength: [2, 'First name must be at least two characters.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is missing.'],
        unique: false,
        trim: true,
        minlength: [2, 'Last name must be at least two characters.']
    },    
    
    password: {
        type: String,
        required: [true, 'Password is required.'],
        unique: false,
        select: false,
        minlength: [8, 'Password must contain at least 8 characters.']
    },
    role: {
        type: String,
        enum: ['parent', 'caregiver'],
        default: 'parent'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamp: true,        

});

//Add middleware to hash password before saving
UserSchema.pre('save', async function(next) {
    //Hash new password or if modified
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error) {
        next(error);
    }
});

//Define model based on the schema
const User = mongoose.model("User", UserSchema);


module.exports = {
    User
}