const Book = require('../models/Book');

// LOGIQUE DE NOTRE ROUTE POST
exports.createBook = ('/', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        userId: req.body.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: { type: String, required: true },
        ratings: [{
            userId: req.body.userId,
            grade: req.body.grade
        }],
        averageRating: req.body.averageRating
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE PUT
exports.modifyBook = ('/:id', (req, res, next) => {
    Book.uptdateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE DELETE
exports.deleteBook = ('/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE GET:ID
exports.getOneBook = ('/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

// LOGIQUE DE NOTRE ROUTE GET
exports.getAllBooks = ('/', (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
});