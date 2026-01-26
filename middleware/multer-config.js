const multer = require('multer'); // PACKAGE DE GESTION DE FICHIER 

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

// LOGIC DE CONFIGURATION DE MULTER
const storage = multer.diskStorage({  
  destination: (req, file, callback) => { // ENREGISTRER LE FICHIER DANS LE DOSSIER IMAGES
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // UTILISE LE NOM D'ORIGINE + AJOUTE TIMESTAMP + .EXTENSIONS
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');