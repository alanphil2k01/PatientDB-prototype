const router = require('express').Router();
const Prescrition = require('../models/Prescriptions')
const {prescriptionValidation} = require('../validation');
const {verifyUser, verifyDoctor} = require('./verifyToken');

router.post('/addnew', verifyDoctor, async (req,res) => {
   const  { error } = prescriptionValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

    const idExists = await Prescrition.findOne({id: req.body.id});
    if(idExists) return res.status(400).send("Prescription id already exists");

   const prescription = new Prescrition({
      name: req.body.name,
      id: req.body.id,
      user_id: req.body.user_id,
      doctor_id: req.body.doctor_id,
      prescriptions: req.body.prescriptions
   });
    try{
        await prescription.save();
        res.send({ user: prescription._id });
    }catch(err){
        res.status(400).send(`ERROR: ${err}`);
    }
});

// TODO: get most recent prescription
// router.post('/getrecent', async (req,res) => {
//    const  { error } = prescriptionValidation(req.body);
//    if(error) return res.status(400).send(error.details[0].message);
//
//    const prescription = new Prescrition().gekkkkkkkkkkkkkk
// });

// TODO: get all prescriptions for a user_id
// router.post('/getall', async (req,res) => {
//    const  { error } = prescriptionValidation(req.body);
//    if(error) return res.status(400).send(error.details[0].message);
// });

module.exports = router;
