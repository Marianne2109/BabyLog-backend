const mongoose = require("mongoose");

const ImmunizationScheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    diseaseName: {
        type: String,
        required: true
    },
    vaccineBrand: {
        type: String,
    },
    notes: {
        type: String,
    },
});

const ImmunizationSchedule = mongoose.model('ImmunizationSchedule', ImmunizationScheduleSchema);

module.exports  = {
    ImmunizationSchedule,
}
