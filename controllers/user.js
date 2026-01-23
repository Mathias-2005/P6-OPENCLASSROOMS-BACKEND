const User = require('../models/User');
const bcrypt = require('bcrypt'); // PACKAGE POUR LE MDP EN HASH
const jwt = require('jsonwebtoken'); // PACKAGE POUR GENERE LE TOKEN 

// LOGIC DE LA FUNCTION SIGNUP
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

// LOGIC DE LA FUNCTION LOGIN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password) // COMPARE LE MDP 'STRING' AVEC UN HASH  
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // POUR CHIFFRER UN NOUVEAU TOKEN 
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // ERREUR SERVEUR
};