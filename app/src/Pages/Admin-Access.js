require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3500;

app.use(cors());

app.use(bodyParser.json());

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Check credentials (replace this with your actual authentication logic)
  if (username === process.env.REACT_APP_ADMIN_USERNAME && password === process.env.REACT_APP_ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
