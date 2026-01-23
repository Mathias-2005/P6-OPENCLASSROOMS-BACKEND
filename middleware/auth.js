const jwt = require('jsonwebtoken'); // PACKAGE POUR GENERE LE TOKEN 
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // SPLITER PRENDRE SEULEMENT LE TOKEN
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // VERIFIER ET DECODER LE TOKEN 
       const userId = decodedToken.userId; // EXTRAIT L'ID DU TOKEN ET L'AJOUTE AU REQUEST
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error }); // ERREUR
   }
};