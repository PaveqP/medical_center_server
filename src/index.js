require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRouter = require('./routes/auth.routes')
const patientRouter = require('./routes/patient.routes')
const doctorRouter = require('./routes/doctor.routes')
const baseRouter = require('./routes/base.routes')

const PORT = 8080;

const app = express();

app.use(express.json())
app.use(cors());
app.use('/api', authRouter)
app.use('/api', patientRouter)
app.use('/api', doctorRouter)
app.use('/api', baseRouter)

app.listen(PORT, () => console.log("server started!"));
