const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // PACKAGE UNIQUE VALIDATEUR 

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// PERMET DE S'ASSURER D'AVOIR UN SEUL ET UNIQUE MDP/EMAIL VALIDE
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);