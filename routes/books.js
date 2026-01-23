const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/books');

// ROUTE POUR AJOUTER UN NOUVEAU BOOK
router.post('/', auth, multer, bookCtrl.createBook);

// ROUTE POUR MODIFIER LE BOOK SELON L'ID
router.put('/:id', auth, multer, bookCtrl.modifyBook);

// ROUTE POUR SUPPRIMER LE LIVRE SELON L'ID 
router.delete('/:id', auth, bookCtrl.deleteBook);

// ROUTE POUR AVOIR LE BOOK AFFICHER SELON ID
router.get('/:id', bookCtrl.getOneBook);

// ROUTE POUR AVOIR TOUT LES BOOKS
router.get('/', bookCtrl.getAllBooks);

module.exports = router;