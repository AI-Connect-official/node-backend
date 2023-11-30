// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware für POST-Daten
app.use(bodyParser.urlencoded({ extended: true }));

// Anmeldeinformationen (normalerweise aus einer Datenbank)
const users = [
    { username: 'benutzer1', password: 'passwort1', role: 'user' },
    { username: 'admin', password: 'geheim', role: 'admin' }
];

// Routen für Login und verschiedene Seiten
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Überprüfen der Anmeldeinformationen
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Weiterleitung basierend auf Benutzerrolle
        if (user.role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/user');
        }
    } else {
        res.send('Falsche Anmeldeinformationen');
    }
});

app.get('/admin', (req, res) => {
    res.send('Willkommen im Admin-Bereich');
});

app.get('/user', (req, res) => {
    res.send('Willkommen im Benutzerbereich');
});

// Starten des Servers
const port = 9999;
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
