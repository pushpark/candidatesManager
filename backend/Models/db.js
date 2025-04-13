const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

mongoose
  .connect(db_url, {
    family: 4,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Db is connected...");
  })
  .catch((err) => {
    console.log("Db connection failed..", err);
  });
