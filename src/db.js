const mongoose = require("mongoose");
require('dotenv').config();

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to DB", error);
  }
}
connectToDB();
