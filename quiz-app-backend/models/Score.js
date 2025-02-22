const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  question: {type: String, required:true},
  options : [{type : String, requited:true}],
  correctAnswer : {type: String, required:true},
  optedAnswer : {type:String}
})

const ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  results: [resultSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Score', ScoreSchema);
