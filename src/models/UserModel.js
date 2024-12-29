const mongoose = require ("mongoose");

//Define MongoDB User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is missing.'],
        unique: true
    },
    name:{
        first: {
          type: String,
          required: [true, 'First name is missing.'],
          unique: false
        },
        last: {
          type: String,
          required: [true, 'Last name is missing.'],
          unique: false
        }    
    },
    password: {
        type: String,
        required: false,
        unique: false,
        select: false
    },


});

//Define model based on the schema
const User = mongoose.model("User", UserSchema);


module.exports = {
    User
}