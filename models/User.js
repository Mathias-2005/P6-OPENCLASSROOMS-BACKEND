const mongoose = require('mongoose'); // PACKAGE MONGOOSE POUR LA STRUCTURATION DE DONNES ET VALIDATION

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // UNIQUE PERMET DE S'ASSURER D'AVOIR UN SEUL ET UNIQUE MDP/EMAIL VALIDE
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);