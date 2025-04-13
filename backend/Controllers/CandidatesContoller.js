const CandidateModel = require("../Models/CandidatesModel");

const createCandidate = async (req, res) => {
  const data = req.body;
  try {
    const model = new CandidateModel(data);
    await model.save();
    res
      .status(201)
      .json({ message: "Candidate is added successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create cndidate", success: false });
  }
};

const getAllCandidate = async (req, res) => {
  try {
    const data = await CandidateModel.find({});
    res.status(200).json({
      message: "All the candidates",
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data", success: false });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    await CandidateModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Candidate is deleted",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete candidte", success: false });
  }
};

module.exports = { createCandidate, getAllCandidate, deleteCandidate };
