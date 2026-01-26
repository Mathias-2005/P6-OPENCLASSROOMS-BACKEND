const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

module.exports = async (req, res, next) => {
    // SI AUCUN FICHIER IMAGE N'EST UPLOADER ON PASSE AU MIDDLEWARE SUIVANT 
    if (!req.file) {
        return next();
    }

    try {
        // NOM DU FICHIER ORIGINAL UPLOADER PAR MULTER
        const originalPath = req.file.path;
        
        // NOUVEAU NOM POUR L'IMAGE OPTIMISER AVEC LE MEME NOM DE FICHIER 
        const nameWithoutExt = req.file.filename.split('.')[0];
        const optimizedFilename = nameWithoutExt + '.webp';
        const optimizedPath = path.join('images', optimizedFilename);

        await sharp(originalPath)
            .resize(300, 400, { // REDIMENSIONNE L'IMAGE EN 400X400 EN GARDANT LE RATIO
                fit: 'cover', // ADAPTE L'IMAGE A SON CONTENEUR
                position : 'center', // POSITIONNE L'IMAGE AU CENTRE
            })
            .webp({ quality: 50 }) // CONVERTIT TOUT EN WEBP + 50% DE QUALITER
            .toFile(optimizedPath); // SAVE TEMPORAIRE

        // SUPPRIME LE FICHIER ORIGINAL
        await fs.unlink(originalPath);
        
        // RENOMME LE FICHIER TEMPORAIRE
        req.file.filename = optimizedFilename;
        req.file.path = optimizedPath;

        next();

    } catch (error) {
        console.error('Erreur Sharp:', error);
        // SI ERREUR ON SUPPRIME LES FICHIERS TEMPORAIRE
        try {
            await fs.unlink(req.file.path);
        } catch (e) {}
        res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
    }
};