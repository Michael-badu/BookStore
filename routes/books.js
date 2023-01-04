const express = require("express")
const AddBookValidationMw = require("../validators/books.validator")
const UpdateBookValidationMw = require("../validators/books.validator")
const bookModel = require("../models/books")
const book = require("../models/books")

const bookRouter = express.Router()

bookRouter.get("/", (req, res) => {
    bookModel.find()
    .then(books => {
        res.send(books)
    })
    .catch(err => {
        console.log (err)
        res.send(err)
    })
})

bookRouter.get("/:id", (req, res) => {
    const id = req.params.id
    bookModel.findById(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

bookRouter.post("/", /*AddBookValidationMw,*/ (req, res) => {
    const book = req.body
    book.lastUpdateAt = new Date() //sets the last update to the current date
    bookModel.create(book)
    .then(book => {
        res.status(201).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

bookRouter.put("/:id", /*UpdateBookValidationMw*/ (req, res) => {
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() //sets the last update to the current date
    bookModel.findByIdAndUpdate(id, book, {new: true})
    .then(newBook => {
        res.status(200).send(newBook)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

bookRouter.delete("/:id", (req, res) => {
    const id = req.params.id
    book.lastUpdateAt = new Date() //sets the last update to the current date
    bookModel.findByIdAndDelete(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = bookRouter