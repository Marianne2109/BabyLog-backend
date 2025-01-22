
const ImmunizationSchedule = require("../models/ImmunizationSchedule");
const moment = require("moment");


const initializeVaccinationStatus = async (dob) => {
    try {
        console.log("Initializing vaccination status for DOB:", dob);

        const schedule = await ImmunizationSchedule.find();
        const childAgeInMonths = moment().diff(moment(dob), 'months');  // Calculate childage in months
        
        console.log("Child's age in months:", childAgeInMonths);

        // Determine required vaccines based on child age
        return schedule.map((schedule) => {
            console.log("Processing Immunization Schedule:", schedule);
            // Filter the vaccines based on the child's age
            const vaccines = schedule.vaccines.map(vaccine => {
                const vaccineAgeInMonths = schedule.age;  // Age at which this vaccine is required
                console.log(`Vaccine ${vaccine.diseaseName} requires age:`, vaccineAgeInMonths);

                let status = "upcoming";
                let receiveDate = null;
                
                // If the child's age is greater than or equal to the vaccine's required age
                if (childAgeInMonths >= vaccineAgeInMonths) {
                    if (!vaccine.receiveDate) {
                        status = "upcoming";  // Vaccine still needed
                    } else {
                        status = "up to date";  // Vaccine already received
                        receiveDate = vaccine.receiveDate;
                    }
                }

                // If the child's age is past the vaccine's required age but not received
                if (childAgeInMonths > vaccineAgeInMonths && !vaccine.receiveDate) {
                    status = "overdue";
                }

                console.log(`Vaccine status for ${vaccine.diseaseName}:`, status);
                return {
                    diseaseName: vaccine.diseaseName || "Unknown",
                    vaccineBrand: vaccine.vaccineBrand || "Unknown",
                    status,
                    receiveDate,
                };
            });

            return {
                scheduleId: schedule.id,
                age: schedule.age,
                vaccines,
                notes: schedule.notes || null,
            };
        });
    } catch (error) {
        console.error("Error initializing vaccination status:", error.message);
        throw new Error("Failed to initialize vaccination status");
    }
};

module.exports = {
    initializeVaccinationStatus,
};