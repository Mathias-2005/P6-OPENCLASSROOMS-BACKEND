const express = require('express'); // PACKAGE GERE LE SERVEUR / ROUTES
const mongoose = require('mongoose'); // PACKAGE MONGOOSE POUR LA STRUCTURATION DE DONNES ET VALIDATION
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://Mathias:Mathias2103@cluster1.dmmauub.mongodb.net/?appName=Cluster1',
  { serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://mon-vieux-grimoire-frontend.onrender.com'
  ];
  
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;