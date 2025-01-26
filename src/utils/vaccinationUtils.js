
const ImmunizationSchedule = require("../models/ImmunizationSchedule");
const moment = require("moment");


const initializeVaccinationStatus = async (dob) => {
    try {
        console.log("Initialising vaccination status based on DOB:", dob);

        const schedule = await ImmunizationSchedule.find();
        const childAgeInMonths = moment().diff(moment(dob), "months");  // Calculate childage in months
        
        console.log("Child's age in months:", childAgeInMonths);

        const vaccinationStatus = [];

        schedule.forEach((scheduleItem) => {
            const scheduleAgeInMonths = parseScheduleAge(scheduleItem.age); 
            console.log(`Processing schedule ${scheduleItem.scheduleId}, age in months: ${scheduleAgeInMonths}`);

            scheduleItem.diseases.forEach((disease) => {

            let status = "upcoming";
            let receiveDate = null;
            let reminderDate = null;
                
            if (childAgeInMonths >= scheduleAgeInMonths) {
                status = "overdue"; //if not received default to overdue
            }   
        
            //if age is past the schedule age and received date is available
            if (childAgeInMonths >= scheduleAgeInMonths && disease.receiveDate) {
                status = "up to date";  
                receiveDate = disease.receiveDate;
            }
            
            //set reminder for 1 month before the vaccine due date
            if (childAgeInMonths < scheduleAgeInMonths) {    
                reminderDate = moment(dob).add(scheduleAgeInMonths, "months").toDate();
            }   

            console.log(`Vaccine status for ${disease.name} (schedule ID ${scheduleItem.scheduleId}):`, status);

            vaccinationStatus.push({
                scheduleId: scheduleItem.scheduleId,
                diseaseName: disease.name,
                vaccineBrand: disease.vaccineBrand,
                status,
                receiveDate,
                reminderDate,
            });
        });
    });

        return vaccinationStatus;
    } catch (error) {
        console.error("Error initialising vaccination status:", error.message);
        throw new Error("Failed to initialise vaccination status");
    }
};

//Helper function to parse age into months
const parseScheduleAge = (age) => {
    if (age.toLowerCase().includes("birth")) return 0;
    if (age.toLowerCase().includes("weeks")) return parseInt(age) / 4;
    if (age.toLowerCase().includes("months")) return parseInt(age);
    if (age.toLowerCase().includes("years")) return parseInt(age) * 12;
    return null;
};

module.exports = {
    initializeVaccinationStatus,
};