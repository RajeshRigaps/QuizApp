const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    optedAnswer: {type: String, default: null}
});

module.exports = mongoose.model("Question", QuestionSchema);
