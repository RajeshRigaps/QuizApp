const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");

const app = express();
//app.use(cors());
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const allowedOrigins = [
    'http://localhost:5173', // if developing locally
    'http://myquizappbucket123.s3-website.ap-south-1.amazonaws.com', // replace with your actual S3 frontend URL
    'https://your-cloudfront-url.amazonaws.com' // (if you later use CloudFront)
  ];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => { 
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));

app.use("/api/quiz", quizRoutes);
app.get('/', (req, res) => {
    res.send('Backend is live!');
});

app.get('/db-status', async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping();
      res.send('✅ MongoDB is connected');
    } catch (err) {
      res.status(500).send('❌ MongoDB not connected');
    }
});


