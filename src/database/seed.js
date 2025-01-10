const { dbConnect, dbDisconnect } = require("./database");
const User = require("../models/UserModel");

const seed = async () => {
    try {
        await dbConnect();

        //Seed example
        const users = [
            { firstName: "Sara", lastName: "Smith", email:"sara@example.com", password:"123456789" }
        ];

        await User.insertMany(users);
        console.log("Database seeded successfully.");

        process.exit(0);
    } catch (error) {
        console.error("Seeding unsuccessful:", error.message);
        process.exit(1);
    }
},

seedDatabase
