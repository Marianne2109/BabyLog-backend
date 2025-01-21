//Function to initialise vaccination status
const { ImmunizationSchedule } = require("../models/ImmunizationSchedule");

const initializeVaccinationStatus = async () => {
    try {
        const schedule = await ImmunizationSchedule.find();
        return schedule.map(schedule => ({
            scheduleId: schedule.id,
            age: schedule.age,
            vaccines: schedule.vaccines.map(vaccine => ({
                diseaseName: vaccine.diseaseName,
                vaccineBrand: vaccine.vaccineBrand,
                status: "overdue",
                receiveDate: null,
            })),
            notes: schedule.notes || null,
        }));
    } catch (error) {
        console.error("Error initialising vaccination status:", error.message);
        throw new Error("Failed to initialise vaccination status");
    }
};

module.exports = {
    initializeVaccinationStatus,
};
