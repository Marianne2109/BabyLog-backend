const mongoose = require("mongoose");

//Nested schema for vaccines
const VaccineSchema = new mongoose.Schema({
    diseaseName: { 
        type: String,
        required: true,
        trim: true,
    },
    vaccineBrand: {
        type: String,
        default: null,
        trim: true,
    },
    notes: {
        type: String,
        default: null,
        trim: true,
    },
});

//Main schema for immunization schedule
const ImmunizationScheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    age: {
        type: String,
        required: true,
        trim: true
    },
    vaccines: {
        type: [VaccineSchema],
        required: true,
    },
    notes: {
        type: String,
        default: null,
        trim: true,
    },    
});


// const getFullSchedule = async () => {
//     return await ImmunizationSchedule.find();
// };

// const getScheduleByAge = async (age) => {
//     return await ImmunizationSchedule.findOne({ age });
// };


const ImmunizationSchedule = mongoose.model('ImmunizationSchedule', ImmunizationScheduleSchema);

module.exports  = {
    ImmunizationSchedule,
    // getFullSchedule,
    // getScheduleByAge
}
