// Importation du module Express
const express = require('express')

// Initialisation de l'application Express
const app = express()
// Définition du port sur lequel l'application écoutera les requêtes
const port = 3000

const coworkingsData = require('./coworkings')

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

// Route pour l'API coworkings
app.get('/api/coworkings', (req, res) => {
    res.send('Hello toi !')  
})

// Définition d'une route avec un paramètre d'URL
// Le paramètre ":id" dans l'URL permet de spécifier un identifiant unique pour récupérer des données spécifiques.
app.get('/api/coworkings/:id', (req, res) => {
    res.send(`Hello coworkers n°${req.params.id} !`)
})

app.get('/api/coworkings/:id', (req, res) => {
    console.log(req.params.id)
    // 12
    // Nom du coworking n°12 : Oasis Coworking
    const result = coworkingsData.find((el) => {
        return el.id === parseInt(req.params.id)
    })

    console.log(result)
    res.send(`Nom du coworking n°${result.id} : ${result.name}`)
})


app.get('/api/user/:id', (req, res) => {
    res.send(`Hello user n°${req.params.id} !`)
})

app.get('/api/comment/:id', (req, res) => {
    res.send(`Hello comment n°${req.params.id} !`)
})

// Configuration de l'application pour écouter les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)  // Message de console indiquant que l'application écoute sur le port spécifié
})