const Joi = require('joi');

const patientRegisterValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const patientLoginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const doctorRegisterValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        specialization: Joi.string().min(6).required(),
        address: Joi.string().min(6).required(),
        verificationCode: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const doctorLoginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const prescriptionValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(6).required(),
        user_id: Joi.number().required(),
        doctor_id: Joi.number().required(),
        prescriptions: Joi.array().items(Joi.object({ 
            medicine: Joi.string().min(2).required().label('medicine'),
            quantity: Joi.string().min(2).required().label('quantity'
        )}))
    });
    return schema.validate(data);
}

const prescriptionValidationUserID = (data) => {
    const schema = Joi.object({
        user_id: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports.patientRegisterValidation = patientRegisterValidation;
module.exports.patientLoginValidation = patientLoginValidation;
module.exports.doctorRegisterValidation = doctorRegisterValidation;
module.exports.doctorLoginValidation = doctorLoginValidation;
module.exports.prescriptionValidation = prescriptionValidation;
module.exports.prescriptionValidationUserID = prescriptionValidationUserID;
