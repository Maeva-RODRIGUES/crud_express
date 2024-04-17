// Importation du module Express
const express = require('express')

// Initialisation de l'application Express
const app = express()
// Définition du port sur lequel l'application écoutera les requêtes
const port = 3000

// Définition des routes et des gestionnaires de requêtes pour l'application

// Route racine de l'application
app.get('/', (req, res) => {
  res.send('Hello World!')  // Réponse renvoyée au client lorsqu'une requête GET est effectuée sur la route '/'
})

// Route pour l'API utilisateur
app.get('/api/user', (req, res) => {
    res.send('Hello Users !')  // Réponse renvoyée au client lorsqu'une requête GET est effectuée sur la route '/api/user'
  })
// Route pour l'API commentaire
  app.get('/api/comment', (req, res) => {
    res.send('Hello comment !')  // Réponse renvoyée au client lorsqu'une requête GET est effectuée sur la route '/api/comment'
})


// Configuration de l'application pour écouter les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)  // Message de console indiquant que l'application écoute sur le port spécifié
})