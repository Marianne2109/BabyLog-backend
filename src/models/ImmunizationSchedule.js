const mongoose = require("mongoose");

const VaccineSchema = new mongoose.Schema({
    diseaseName: { 
        type: String,
        required: true,
    },
    vaccineBrand: {
        type: String,
        default: null,
    },
    notes: {
        type: String,
        default: null,
    }
});

const ImmunizationScheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    vaccines: [VaccineSchema],
});

//     diseaseName: {
//         type: String,
//         required: true,
//     },
//     vaccineBrand: {
//         type: String,
//     },
//     notes: {
//         type: String,
//     },
// });

const getFullSchedule = async () => {
    return await ImmunizationSchedule.find();
};

const getScheduleByAge = async (age) => {
    return await ImmunizationSchedule.findOne({ age });
};


const ImmunizationSchedule = mongoose.model('ImmunizationSchedule', ImmunizationScheduleSchema);

module.exports  = {
    ImmunizationSchedule,
    getFullSchedule,
    getScheduleByAge
}
