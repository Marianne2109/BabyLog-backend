//This model is for the Immunization Schedule (static) data that will serve as a reference for all children

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
    scheduleId: {
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


const ImmunizationSchedule = mongoose.model('ImmunizationSchedule', ImmunizationScheduleSchema);

module.exports  = {
    ImmunizationSchedule,
}
