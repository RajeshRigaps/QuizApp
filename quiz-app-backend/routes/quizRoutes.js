const express = require("express");
const Question = require("../models/Question");
const Score = require("../models/Score");

const router = express.Router();

// Get Random Questions
router.get("/questions", async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 5 } }]); // Get 5 random questions
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit Quiz & Save Score
router.post('/submit', async (req, res) => {
    const { username, results, score } = req.body;
  
    try {
      // Update questions with opted answers
      for (const result of results) {
        await Question.findByIdAndUpdate(result._id, { optedAnswer: result.optedAnswer });
      }
  
      // Save the score to the database
      const newScore = new Score({ username, score });
      await newScore.save();
  
      res.status(200).json({ message: 'Quiz submitted successfully!' });
    } catch (err) {
      console.error('Error submitting quiz:', err);
      res.status(500).json({ message: 'Error submitting quiz' });
    }
  });

// Get Top Scores
router.get("/scores", async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

