const bookModel = require("../models/books")

function getAllBooks (req, res) {
    bookModel.find()
    .then(books => {
        res.send(books)
    })
    .catch(err => {
        console.log (err)
        res.send(err)
    }) 
}

function getBookByID (req, res){
    const id = req.params.id
    bookModel.findById(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

function addBook (req, res) {
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
}

function updateBookByID (req, res) {
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
}

function deleteBookByID (req, res) {
    const id = req.params.id
    bookModel.findByIdAndDelete(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

module.exports = {
    getAllBooks,
    getBookByID,
    addBook,
    updateBookByID,
    deleteBookByID,
}