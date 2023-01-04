const express = require ("express")
const bodyParser = require ("body-parser")
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const CONFIG = require ("./config/config")

//Routes
const bookRouter = require("./routes/books.route")
const authorRouter = require("./routes/authors.route")

const connectMongodb = require ("./db/mongodb")

const app = express()

//connect to Mongodb Database
connectMongodb()

//Add middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//Security Middleware
app.use(helmet())

app.use("/api/v1/books", bookRouter)
app.use("/api/v1/authors", authorRouter)

app.get ("/", (req, res) => {
    res.send("Hello Bookstore")
})

//Error Handler Middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on http://localhost:${CONFIG.PORT}`)
})