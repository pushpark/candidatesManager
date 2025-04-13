const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 3004;
const CandidatesRoute = require("./Routes/CandidatesRouter");
const bodyParser = require("body-parser");

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use(bodyParser.json());
app.use("/candidates", CandidatesRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
