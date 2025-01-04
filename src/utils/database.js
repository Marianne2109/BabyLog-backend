require('dotenv').config({ path: '../.env' });

const mongoose = require("mongoose");

const { UserModel } = require("../models/UserModel");

async function dbConnect(){
    let databaseUrl = process.env.DATABSE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    await mongoose.connect(databaseUrl);
}

module.exports = {
    dbConnect
}