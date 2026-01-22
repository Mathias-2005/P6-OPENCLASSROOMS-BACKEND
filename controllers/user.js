const User = require('../models/User');
const bcrypt = require('bcrypt'); // PACKAGE POUR LE MDP EN HASH

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // 10 TOURS POUR LE HASHAGE + IL EN A + C'EST LONG + C'EST SECURISER
        .then(hash => {
            const user = new User({ // ON CREER LE NOUVEL UTILISATEUR
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) 
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // ERREUR SERVEUR
};

exports.login = (req, res, next) => {

};