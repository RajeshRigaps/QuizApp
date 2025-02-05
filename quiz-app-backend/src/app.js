const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Quiz App Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
