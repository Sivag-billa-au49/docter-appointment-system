const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function config() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "doctorappointment",
    });
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to Data Base");
    process.exit();
  }
}

module.exports = {
  config,
};
