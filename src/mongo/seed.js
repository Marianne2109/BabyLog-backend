

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
            { 
                firstName: "Sara", 
                lastName: "Smith", 
                email:"sara@example.com", 
                password:"123456789" 
            }
        ];

     
        await User.deleteMany({});
        const insertedUsers = await User.insertMany(users);
        // await User.insertMany(users);
        console.log("Database seeded successfully:", insertedUsers);

        //get created user id
        const userId = insertedUsers[0]._id;

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
                createdBy: userId,
            },
            {
                childName: "florence",
                dob: new Date("2022-05-20"),
                dueDate: new Date("2022-05-20"),
                isPremature: true,
                weightAtBirth: 3.5,
                heightAtBirth: 50,
                headCircumferenceAtBirth: 36,
                createdBy: userId,
            },
            {
                childName: "bowie",
                dob: new Date("2021-01-20"),
                dueDate: new Date("2021-01-19"),
                isPremature: true,
                weightAtBirth: 4.2,
                heightAtBirth: 54,
                headCircumferenceAtBirth: 38,
                createdBy: userId,
            },
        ];
        await Child.deleteMany({});
        const insertedChildren = await Child.insertMany(children);
        console.log("child profile created successfully:", insertedChildren);

        await dbDisconnect();
        console.log("Database is now disconnected.");
    } catch (error) {
        console.error("Seeding failed", error.message)
    process.exit(1);
    }
};


seed();



