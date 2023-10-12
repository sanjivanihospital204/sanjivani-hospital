const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient');
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3007;

app.get('/', (req, res) => {
  res.send('Working ...:)');
});

app.use('/patient', patientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
