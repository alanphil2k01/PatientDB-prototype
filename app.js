const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

//Import Routes
const userRoute = require('./routes/user')
const doctorRoute = require('./routes/doctor')
const prescriptionRoute = require('./routes/prescriptions')

//dotenv
dotenv.config()

//Create Express App
const app = express();

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to mongodb server')
);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/user', userRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/prescriptions', prescriptionRoute);

//Routes
app.get('/', (_, res) => {
    res.send('We are at home');
})

//Listen
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Listening to http://localhost:${port}`);
})
