//Script reads JSON file and seed to database

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { 
    dbConnect, 
    dbDisconnect,
} = require("../mongo/database");
const { ImmunizationSchedule } = require("../models/ImmunizationSchedule");


// Read the JSON file
const jsonData = fs.readFileSync(path.join(__dirname, 'nipSchedule.json'), 'utf-8');
const immunizationData = JSON.parse(jsonData);

const seedNipSchedule = async () => {
    try {
        await dbConnect();
        console.log("Connected to MongoDB");

        // Ensure collection is dropped to clear stale data
        await mongoose.connection.db.dropCollection('immunizationschedules').catch(() => console.log('Collection does not exist'));
        console.log('Dropped old collection');


        //Nested data structure
        const nestedData = immunizationData.map((entry) => ({
          scheduleId: entry.scheduleId || Math.random(), 
          age: entry.age,
          vaccines: entry.diseases.map((disease) => ({
            diseaseName: disease.name,
            vaccineBrand: disease.vaccineBrand || null,
            notes: disease.notes || null,           
          })),
          notes: entry.notes || null,
        }));
        
        
        console.log("Seeding data:", JSON.stringify(nestedData, null, 2));

        await ImmunizationSchedule.insertMany(nestedData);
        console.log('Database seeded successfully');
      } catch (error) {
        console.error('Error seeding database:', error);

      } finally {
        // Disconnect from the database
        await dbDisconnect();
      }
    }; 
    
    seedNipSchedule();
