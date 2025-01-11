const { dbConnect } = require("../mongo/database");
const { dbDisconnect } = require("../mongo/database");
const User = require("../module/User");

const seed = async () => {
    try {
        await dbConnect();

        //Seed example user
        const users = [
            { firstName: "Sara", lastName: "Smith", email:"sara@example.com", password:"123456789" }
        ];

        await User.insertMany(users);
        console.log("Database seeded successfully.");

        process.exit(0);
    } catch (error) {
        console.error("Seed process unsuccessful:", error.message);
        process.exit(1);
    }
};

dbConnect()
.then(() => {
    console.log("connected to database. Seed in progress");
    return seed();
})
.catch((error) => {
    console.log("Failed to connect to database", error.message);
    process.exit(1);
});

