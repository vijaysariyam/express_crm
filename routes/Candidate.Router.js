const express = require("express");
const { authenticateToken } = require("../middleware/jwt.js");

const router = express.Router();
const CandidateController = require("../controllers/Candidate.Controller.js"); // Update the path accordingly

// Routes for User CRUD operations

// router.get('/candidate/:id', CandidateController.getById);
// router.post('/candidate/', CandidateController.create);
// router.put('/candidate/:id', CandidateController.updateById);
// router.delete('/candidate/:id', CandidateController.deleteById);

router.post("/candidates", authenticateToken, CandidateController.create);
router.post(
  "/candidates/:id",
  authenticateToken,
  CandidateController.updateById
);
router.get("/candidates/:id", authenticateToken, CandidateController.getById);
router.delete(
  "/candidates/:id",
  authenticateToken,
  CandidateController.deleteById
);
router.get("/candidates", authenticateToken, CandidateController.getAll);
router.post("/candidate/search", authenticateToken, CandidateController.search);
module.exports = router;
