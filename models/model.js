const sequelize = require("./connection.js");
const {DataTypes} = require("sequelize");

const DoctorAvailabilty = sequelize.define('doctor_availabilities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        unique:true,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING
    },
    end_time: {
        type: DataTypes.STRING
    },
    no_of_patients: {
        type: DataTypes.INTEGER
    }
    }, 
    {} 
);

const DoctorTimeSlot = sequelize.define('doctor_time_slots', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    doctor_availability_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "doctor_availabilities",
            key: "id"
        }
    },
    slot_start_time: {
        type: DataTypes.STRING
    },
    slot_end_time: {
        type: DataTypes.STRING
    }
    }, 
    {} 
);

const PatientBookingSlot = sequelize.define('patient_booking_slots', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctor_time_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "doctor_time_slots",
            key: "id"
        }
    },
    appointment_date: {
        type: DataTypes.STRING
    }
    }, 
    {} 
);

sequelize.sync();

module.exports = {PatientBookingSlot, DoctorTimeSlot, DoctorAvailabilty, sequelize};