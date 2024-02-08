const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 5500;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let generatedFileName
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // For PUBLIC USE =====      cb(null, '/public/uploads/'); // Uploads will be stored in the 'uploads' directory
    cb(null, 'C:/Users/nikos/OneDrive/Documents/Vova Woodworking/app/public/uploads');
  },
  filename: (req, file, cb) => {
    generatedFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, generatedFileName);
  },
});

const upload = multer({ storage: storage });

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Additional middleware for parsing JSON, if needed
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add this middleware to log errors
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const uploadedItems = [];

// Handle file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
  const quantity = req.body.quantity;
  const namePrice = req.body.namePrice;
  const typeOfFile = req.body.typeOfItem;
  const fileName = generatedFileName;

  uploadedItems.push({fileName: fileName, quantity, namePrice, typeOfFile });

  console.log('File uploaded', fileName, quantity, namePrice, typeOfFile)
  console.log(req.file); // Log information about the uploaded file
  res.send(`File uploaded! Filename:  ${fileName}, Quantity: ${quantity}, price: ${namePrice}, Type Of File: ${typeOfFile}`);
});

app.get('/uploadedItems', (req, res) => {
  res.json(uploadedItems);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
