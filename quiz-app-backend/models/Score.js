const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  results: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      optedAnswer: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Score', ScoreSchema);
