const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000
require("./db/sequelizeSetup")

const corsOptions = {
    credentials: true,
};

app
    .use(cors(corsOptions))
    .use(express.json())
    .use(cookieParser())

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

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