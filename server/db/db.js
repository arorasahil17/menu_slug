const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://arorasahil074:lhFDFs15q1foiO58@cluster0.qjzavhb.mongodb.net/"
    );
    console.log("Connection to mongoDB Database is successfull :)");
  } catch (error) {
    console.log(
      `Something went wrong while connecting to database :( ${error}`
    );
  }
};

module.exports = connectDb;
