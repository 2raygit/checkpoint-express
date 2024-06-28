const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier les heures ouvrables
const checkOfficeHours = (req, res, next) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();

    // Les heures ouvrables sont du lundi (1) au vendredi (5) de 9h à 17h
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.send('<h1>L\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).</h1>');
    }
};

// Utiliser le middleware
app.use(checkOfficeHours);

// Définir le répertoire des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
