const {number} = require('joi')
const mongoose =  require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Number,
        required: true,
    },
    doctor_id: {
        type: Number,
        required: true,
    },
    prescriptions: [{
        medicine: {
            type: String,
            min: 2,
            max: 255
        },
        quantity: {
            type: String,
            min: 2,
            max: 255
        }

    }]
})

module.exports = mongoose.model('Prescription',prescriptionSchema,'Prescriptions')
