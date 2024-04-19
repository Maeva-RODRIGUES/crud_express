const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

const { sequelize } = require("./db/sequelizeSetup")

// DESTRUCTURATION D'OBJET, très souvent utilisé dans import/export de variable d'un fichier à l'autre
const myObj = {
    country: { name: "FRANCE", code: "FR" },
    town: "Bordeaux"
}

const { country } = myObj
const { town } = myObj

console.log(country, town)

// import de fonction :
const { myFunction } = require('./db/sequelizeSetup')

myFunction('Maëva')

app
    .use(morgan('dev'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})