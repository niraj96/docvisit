const models = require("../models/model");
const moment = require("moment");

const DoctorAvailabilty = models.DoctorAvailabilty;
const DoctorTimeSlot = models.DoctorTimeSlot;
const PatientBookingSlot = models.PatientBookingSlot;
const sequelize = models.sequelize;

exports.create_slot = (req,res)=>{
    try{
        const {fields, files} = req;
        let {doctor_id, start_time, end_time, no_of_patients } = fields;

        let tempStartTime = start_time;
        let tempEndTime = end_time;
        let currentDate = moment().format("YYYY/M/DD").toString();
        start_time = new Date(currentDate+" "+start_time);
        end_time = new Date(currentDate+" "+end_time);

        let startTime = new Date(start_time).getTime();
        let endTime = new Date(end_time).getTime();
        let diff = (endTime - startTime) / 60000;
        let diffMin = diff/no_of_patients;
        let curent_min= new Date(start_time).getMinutes();

        let slotArr = [];
        for(let i=0; i<no_of_patients; i++){
            curent_min += diffMin; 
            console.log(curent_min);
            slotArr.push(new Date(start_time).setMinutes(curent_min));
        }

        let slotTimeArr = [tempStartTime];
        slotArr.forEach(timestamp=>{
            slotTimeArr.push(moment(timestamp).format("hh:mm A"));
        });

        DoctorAvailabilty.create({
            doctor_id: doctor_id,
            start_time: tempStartTime,
            end_time: tempEndTime,
            no_of_patients: no_of_patients
        }).then(addTODoctorAvail =>{
            let insertId = addTODoctorAvail['id'];
            let bulkInsert = [];

            for(let j=0; j<no_of_patients; j++){
                let slotStartTime = (slotTimeArr[j]) ? slotTimeArr[j] : '';
                let slotEndTime = (slotTimeArr[j+1]) ? slotTimeArr[j+1] : '';
                bulkInsert.push({
                    doctor_id: doctor_id,
                    doctor_availability_id: insertId,
                    slot_start_time: slotStartTime,
                    slot_end_time: slotEndTime,
                });
            }

            DoctorTimeSlot.bulkCreate(bulkInsert).then(resp=>{
                res.status(200).json(resp);
            }).catch(excp=>{
                res.status(500).json(excp);
            });

        }).catch(excp=>{
            res.status(500).json(excp);
        });

    }catch(excp){
        res.status(500).json(excp);
    }
}

exports.check_slot = async(req,res)=>{
    try{
        const {fields, files} = req;
        console.log(fields)
        let {appointment_date, doctor_time_slot_id, no_of_patient} = fields;
      
        let fetchSql =  `SELECT ds.* FROM doctor_time_slots AS ds LEFT JOIN patient_booking_slots ps ON ds.id = ps.doctor_time_slot_id 
        WHERE ds.doctor_id =(SELECT doctor_id FROM doctor_time_slots WHERE id = ${doctor_time_slot_id}) 
        AND ds.id != (SELECT doctor_time_slot_id FROM patient_booking_slots WHERE appointment_date = "${appointment_date}") 
        ORDER BY ps.appointment_date DESC;`;
        const [result, metadata] = await sequelize.query(fetchSql);
       
        if(result && result.length == 0){
            res.status(200).json("Not Available any slot");
        }
        else{
         
            if(result.length > no_of_patient){
                let availableSlots = [...result].slice(0, parseInt(no_of_patient));
                res.status(200).json({available_slots:availableSlots });
            }else{
                res.status(200).json({available_slots: result});
            }
            
        }
      

    }catch(excp){
        res.status(500).json("Something went wrong!!");
    }
}

exports.book_slot = async(req,res)=>{
    try{
        const {fields, files} = req;
        let bulkPatientBook = [
            {
                "appointment_date": "2020-08-13",
                "doctor_time_slot_id": 2,
                "patient_id":100 
            },
            {
                "appointment_date": "2020-08-13",
                "doctor_time_slot_id": 3,
                "patient_id":100 
            },
            {
                "appointment_date": "2020-08-20",
                "doctor_time_slot_id": 1,
                "patient_id":200 
            }
        ]
        PatientBookingSlot.bulkCreate(bulkPatientBook).then(resp=>{
            res.status(200).json(resp);
        }).catch(excp=>{
            res.status(500).json(excp);
        });

    }catch(excp){
        res.status(500).json("Something went wrong!!");
    }
}