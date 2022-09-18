const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGO_URI");

const connectDB = () => {
  mongoose
    .connect(db)
    .then("database connected")
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
