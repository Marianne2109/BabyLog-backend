require('dotenv').config();
const mongoose = require("mongoose");


const dbConnect = async () => {
  try{
    const databaseUrl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    await mongoose.connect(databaseUrl);

    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};


module.exports = {
    dbConnect,
}