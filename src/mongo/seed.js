const { 
    dbConnect, 
    dbDisconnect,
} = require("../mongo/database");
const User = require("../models/UserModel");
const Child = require("../models/ChildModel");


const seed = async () => {
    try {
        await dbConnect();
        
        //Seed test user
        const users = [
            { firstName: "Sara", lastName: "Smith", email:"sara@example.com", password:"123456789" }
        ];

        
        await User.deleteMany({});
        await User.insertMany(users);
        console.log("Database seeded successfully.");

    // } catch (error) {
    //     console.error("Seed process unsuccessful:", error.message);
    // }


        //Seed test child profile 
        const children = [
            {
                childName: "Emma",
                dob: new Date("2023-03-19"),
                dueDate: new Date("2023-04-10"),
                isPremature: true,
                weightAtBirth: 3.1,
                heightAtBirth: 48,
                headCircumferenceAtBirth: 34,
            },
        ];
        await Child.deleteMany({});
        await Child.insertMany(children);
        console.log("child profile created successfully");

        await dbDisconnect();
        console.log("Database is now disconnected.");
    } catch (error) {
        console.error("Seeding failed", error.message)
    process.exit(1);
    }
};


seed();


// dbConnect()
// .then(() => {
//     console.log("connected to database. Seed in progress");
//     return seed();
// })
// .catch((error) => {
//     console.log("Failed to connect to database", error.message);
//     process.exit(1);
// });

