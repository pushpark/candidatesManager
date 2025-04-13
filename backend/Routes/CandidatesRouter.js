const {
  createCandidate,
  getAllCandidate,
  deleteCandidate,
} = require("../Controllers/CandidatesContoller");

const router = require("express").Router();

router.get("/", getAllCandidate);

router.post("/", createCandidate);

router.delete("/:id", deleteCandidate);

module.exports = router;
