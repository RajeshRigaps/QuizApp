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
router.post("/submit", async (req, res) => {
    try {
        const { username, results } = req.body;
        const questions = await Question.find({ _id: { $in: Object.keys(answers) } });

        let score = 0;
        questions.forEach((q) => {
            if (q.answer === answers[q._id]) score++;
        });

        const newScore = new Score({ username, score });
        await newScore.save();

        res.json({ message: "Quiz submitted!", score });
    } catch (err) {
        res.status(500).json({ error: err.message });
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

