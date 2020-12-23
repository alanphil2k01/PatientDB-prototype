const router = require('express').Router();
const Prescrition = require('../models/Prescriptions')
const {prescriptionValidation, prescriptionValidationUserID} = require('../validation');
const {verifyAny, verifyDoctor} = require('./verifyToken');

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
        res.send(prescription);
    }catch(err){
       res.status(400).send({message: err});
    }
});

router.post('/getrecent', async (req,res) => {
   const  { error } = prescriptionValidationUserID(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   try{
      const prescriptions = await Prescrition.find({user_id: req.body.user_id}).sort({ date: -1 }).limit(1);
      res.json(prescriptions);
   }catch(err){
      res.status(400).send(err);
   }
});

router.get('/:id', verifyAny,  async (req,res) => {
   const  { error } = prescriptionValidationUserID(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   try{
      const prescription = await Prescrition.findOne({id: req.params.id});
      res.json(prescription);
   }catch(err){
      res.status(400).send(err);
   }
});

router.get('/', verifyAny,  async (req,res) => {
   const  { error } = prescriptionValidationUserID(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   try{
      const prescriptions = await Prescrition.find({user_id: req.body.user_id}).sort({ date: -1 }).limit(30);
      res.json(prescriptions);
   }catch(err){
      res.status(400).send(err);
   }
});

module.exports = router;
