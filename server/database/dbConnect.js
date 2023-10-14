const mongoose = require("mongoose");
require("dotenv").config();

console.log("process.env.", process.env.USER_NAME);
const DB_URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qqswskm.mongodb.net/${process.env.MONGO_COLLECTION_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection Successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

