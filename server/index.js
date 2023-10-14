const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient');
const adminRoutes = require('./routes/admin');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const { auth } = require('./middleware/auth');

const PORT = process.env.PORT || 3007;

app.get('/', (req, res) => {
  res.send('Working ...:)');
});

app.use('/patient', auth, patientRoutes);

app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
