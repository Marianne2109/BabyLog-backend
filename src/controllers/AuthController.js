//Auth controller will handle registration and login

const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel")

class AuthController {
    //Registration 
    async register(req, res){
        try {
            const {email, password, firstName, lastName, role} = req.body;

            //Check if user with email exists
            const existingUser = await User.findOne({email: email.toLowerCase()});
            if (existingUser) {
                return res.status(400).json({
                    error: "It looks like this email is already registered, try again with a different email."
                });
            }
        }

        //Create new user if email not registered already
        const user = new User({
            email: email.toLowerCase(),
            firstName,
            lastName,
            password,
            role: role || "parent" //set parent as default role if not specified
        });

        await user.save();
    }
}