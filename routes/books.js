const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');

// ROUTE POUR AJOUTER UN NOUVEAU BOOK
router.post('/', bookCtrl.createBook);

// ROUTE POUR MODIFIER LE BOOK SELON L'ID
router.put('/:id', bookCtrl.modifyBook);

// ROUTE POUR SUPPRIMER LE LIVRE SELON L'ID 
router.delete('/:id', bookCtrl.deleteBook);

// ROUTE POUR AVOIR LE BOOK AFFICHER SELON ID
router.get('/:id', bookCtrl.getOneBook);

// ROUTE POUR AVOIR TOUT LES BOOKS
router.get('/', bookCtrl.getAllBooks);

module.exports = router;