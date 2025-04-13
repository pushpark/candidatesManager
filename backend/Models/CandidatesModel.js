const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/, // 10-digit phone number validation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ["1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"],
  },
  skills: {
    type: [String],
    required: true,
  },
});

const CandidateModel = mongoose.model("candidates", candidateSchema);

module.exports = CandidateModel;
