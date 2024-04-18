// Définition du port sur lequel le serveur écoutera les requêtes entrantes
const port = 3000

// Importation des données des espaces de coworking à partir d'un fichier local
const coworkingsData = require('./coworkings')

// Création d'une instance de l'application Express
const app = require('express')()

// Middleware de journalisation qui enregistre l'heure de chaque requête
app.use((req, res, next) => {
    const now = new Date()
    console.log(`${now.getHours()}h${now.getMinutes()}min${now.getSeconds()}s`) // Journalisation de l'heure de la requête
    next() // Passe au middleware suivant dans la chaîne de traitement
})

// Définition des routes et des réponses correspondantes

// Route racine
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' }) // Répond avec un message JSON "Hello World!"
})

// Route pour les utilisateurs
app.get('/api/users', (req, res) => {
    res.json({ message: 'Hello utilisateur!' }) // Répond avec un message JSON "Hello utilisateur!"
})

// Route pour un utilisateur spécifique en fonction de son ID
app.get('/api/users/:id', (req, res) => {
    res.json({ message: `Utilisateur n°${req.params.id}` }) // Répond avec un message JSON contenant l'ID de l'utilisateur
})

// Route pour les commentaires
app.get('/api/comments', (req, res) => {
    res.json({ message: 'Hello Commentaire!' }) // Répond avec un message JSON "Hello Commentaire!"
})

// Route pour un commentaire spécifique en fonction de son ID
app.get('/api/comments/:id', (req, res) => {
    res.json({ message: `Commentaire n°${req.params.id}` }) // Répond avec un message JSON contenant l'ID du commentaire
})

// Route pour les espaces de coworking
app.get('/api/coworkings', (req, res) => {
    res.json({ message: `Il y a ${coworkingsData.length} coworkings` }) // Répond avec un message JSON contenant le nombre d'espaces de coworking
})

// Route pour un espace de coworking spécifique en fonction de son ID
app.get('/api/coworkings/:id', (req, res) => {
    // Recherche de l'espace de coworking correspondant à l'ID spécifié dans les données importées
    const result = coworkingsData.find((el) => {
        return el.id === parseInt(req.params.id)
    })
    // Construction du message de réponse en fonction du résultat de la recherche
    const msg = result ? `Nom du coworking n°${result.id} : ${result.name}` : `Le coworking recherché n'existe pas`
    res.json({ message: msg }) // Répond avec un message JSON contenant le résultat de la recherche
})

// Démarrage du serveur et écoute des requêtes entrantes sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) // Journalisation du démarrage du serveur avec le port utilisé
})