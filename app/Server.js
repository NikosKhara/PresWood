import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import multer from 'multer'
import path from 'path'

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, addDoc, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"

const app = express();
const port = 5500;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

let generatedFileName
// Set up multer for file uploads
const storag = multer.memoryStorage()

const upload = multer({ storage: storag });

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

//for firestore database
const firebaseApp = initializeApp ({
  apiKey: "AIzaSyDcuGQwpfsbbsE8H1ro3jKXiPufyGJjrWU",
  authDomain: "vovawood-9676c.firebaseapp.com",
  projectId: "vovawood-9676c",
  storageBucket: "vovawood-9676c.appspot.com",
  messagingSenderId: "374261117560",
  appId: "1:374261117560:web:3ea9ff54c94ece90dcb38d"
});

const firestore = getFirestore();
const storage = getStorage();

// Handle file upload
app.post('/upload', upload.single('myFile'), async (req, res) => {
  try {
    let quantity = String(req.body.quantity);
    let namePrice = String(req.body.namePrice);
    let typeOfItem = String(req.body.typeOfItem);
    const fileName = req.file.originalname
    const Today = new Date();

    console.log('myFile: %o', req.file)
    
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `files/${fileName}   -   ${Today}`);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Save references in Firestore
    const itemOfUse = doc(firestore, `items/${Today}`);
    const docData = {
      description: 'item',
      quantity: quantity,
      namePrice: namePrice,
      file: downloadURL, // Save download URL in Firestore
      typeOfItem: typeOfItem,
      isSold: false,
    };

    await setDoc(itemOfUse, docData, { merge: true });
    res.send('Item uploaded successfully');
  } catch (error) {
    console.error('Error uploading item:', error);
    res.status(500).send('Error uploading item');
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});













/*
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import multer from 'multer'
import path from 'path'

const app = express();
const port = 5500;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
  res.send(`File uploaded! Filename:  ${fileName}, Quantity: ${quantity}, price: ${namePrice}, Type Of Item: ${typeOfFile}`);
});

app.get('/uploadedItems', (req, res) => {
  res.json(uploadedItems);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
