const Book = require('../models/Book');
const fs = require('fs'); // PACKAGE FS PERMET DE MODIFIER LE SYSTEME DE FICHIERS

// LOGIQUE DE NOTRE ROUTE POST
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book); // TRANSFORME UNE STRING EN OBJECT JS EXPLOITABLE
    delete bookObject._id; // DELETE L'ID DU CLIENT
    delete bookObject._userId; // DELETE L'USERID DU CLIENT
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // RECONSTRUCTION DE L'URL
    });

    book.save()
        .then(() => { res.status(201).json({ message: 'Book saved !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// LOGIQUE DE NOTRE ROUTE PUT
exports.modifyBook = ((req, res, next) => {
    const bookObject = req.file ? { // SI IL A UNE IMAGE ALORS ON TRAITE LA NOUVELLE IMAGE SINON SEULEMENT LE BODY
        ...JSON.parse(req.body.book), // TRANSFORME UNE STRING EN OBJECT JS EXPLOITABLE
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // RECONSTRUCTION DE L'URL
    } : { ...req.body };

    delete bookObject._userId; // DELETE L'USERID DU CLIENT
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(400).json({ message: 'Not authorized' }); // SI CE N'EST PAS LE PROPRIETAIRE ALORS ERREUR
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Book modify !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
});

// LOGIQUE DE NOTRE ROUTE DELETE
exports.deleteBook = ((req, res, next) => {
    Book.findOne({ _id: req.params.id }) // ON SELECTIONNE LE BON ID A DELETE
        .then(book => { // MESSAGE D'ERREUR SI CE N'EST PAS LE BON UTILISATEUR
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else { // SI C'EST LE BON UTILISATEUR ALORS ON DELETE
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { // FS UNLINK POUR DELETE LE FICHIER 
                    Book.deleteOne({ _id: req.params.id }) // ON DELETE LE BOOK DE LA BASE DE DONNEES
                        .then(() => { res.status(200).json({ message: 'Book deleted !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// LOGIQUE DE NOTRE ROUTE GET:ID
exports.getOneBook = ((req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE GET
exports.getAllBooks = ((req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE GET BESTRATING
exports.getBestRating = ((req, res, next) => {
    Book.find().sort({ ratings: -1 }).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE POST RATEBOOK
exports.rateBook = async (req, res, next) => {
    const id = req.params.id;
    if (id == null) {
        res.status(400).json('Book id is missing !');
        return;
    }
    const rating = req.body.rating;
    const userId = req.body.userId;
    try {
        const book = await Book.findById(id);
        if (book == null) {
            res.status(404).json('Book not found');
            return;
        }
        const ratingInDb = book.ratings;
        const previousRatingFromCurrentUser = ratingInDb.find((rating) => rating.userId == userId);
        if (previousRatingFromCurrentUser != null) {
            res.status(400).json('You have already rated this book !');
            return;
        }
        const newRating = { userId, grade: rating };
        ratingInDb.push(newRating); // N'oubliez pas d'ajouter le nouveau rating !
        book.averageRating = calculateAverageRating(ratingInDb);
        await book.save(); // AJOUT DE AWAIT ICI AUSSI !
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function calculateAverageRating(ratings) {
    const sumOfAllGrades = ratings.reduce((sum, rating) => sum + rating.grade, 0);
    return sumOfAllGrades / ratings.length;
}
