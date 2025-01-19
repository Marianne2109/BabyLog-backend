//Script reads JSON file and seed to database

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { 
    dbConnect, 
    dbDisconnect,
} = require("../mongo/database");
const { ImmunizationScheduleModel } = require("../models/ImmunizationScheduleModel");


// Read the JSON file
const jsonData = fs.readFileSync(path.join(__dirname, 'immunizationSchedule.json'), 'utf-8');
const immunizationData = JSON.parse(jsonData);

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/${process.env.npm_package_name}', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     seedDatabase();
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// Seed the database
const seedImmunizationSchedule = async () => {
  try {
    await ImmunizationScheduleModel.insertMany(immunizationData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dbDisconnect();
  }
};

// Connect to MongoDB and seed the database
dbConnect()
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// // Load immunization schedule data
// const jsonFilePath = path.join("../mongo/immunizationSchedule.json");
// let immunizationData;

// try {
//     const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
//     immunizationData = JSON.parse(jsonData);
// } catch (error) {
//     console.error("Error reading JSON file:", error.message);
//     process.exit(1); // Exit if the JSON file cannot be read
// }

// // Connect to MongoDB and save data
// const saveImmunizationSchedule = async () => {
//     try {
//         //connect to MongoDB
//         await dbConnect();
//         console.log("Connected to MongoDB");

//         // Insert new data
//         await ImmunizationSchedule.insertMany(immunizationData);
//         console.log("Immunization schedule saved successfully");

//         //Disconnect from MongoDB
//         await dbDisconnect();
//     } catch (error) {
//         console.error("Error saving immunization schedule:", error.message);
//         mongoose.disconnect();
//     }
// };

seedImmunizationSchedule();