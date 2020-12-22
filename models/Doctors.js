const {boolean, bool} = require('joi');
const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    address: {
        type: String,
        max: 255
    },
    specialization: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    verfied: {
        type: Boolean
    }
});

module.exports = mongoose.model('Doctor', doctorSchema,"doctors");
