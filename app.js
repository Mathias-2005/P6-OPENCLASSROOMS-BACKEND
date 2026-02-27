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

// CORS - AMÉLIORÉ
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173', // Si tu utilises Vite
    'https://mon-vieux-grimoire-frontend.onrender.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Gérer les requêtes OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES API
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTE PAR DÉFAUT (Important pour Render!)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur Mon Vieux Grimoire API',
    version: '1.0.0',
    status: 'OK'
  });
});

// ROUTE 404 - pour toute route non trouvée
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.path,
    method: req.method
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Erreur serveur'
  });
});

module.exports = app;