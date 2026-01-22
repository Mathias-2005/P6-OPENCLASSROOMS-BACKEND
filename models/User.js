const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // UNIQUE PERMET DE S'ASSURER D'AVOIR UN SEUL ET UNIQUE MDP/EMAIL VALIDE
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);