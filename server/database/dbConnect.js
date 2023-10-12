const mongoose = require("mongoose");

const DB_URI = 'mongodb+srv://sanjivanihospital204:Empty86@cluster0.qqswskm.mongodb.net/sanjivaniHospital?retryWrites=true&w=majority';

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

