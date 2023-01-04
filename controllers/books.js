const Books = require('../models/Books')

//Add a book to the database
const createBook = async (req, res, next) => {
  try {
    const savedBook = await Books.create(req.body)
    return res.status(201).json(savedBook)
  } catch (error) {
    next(error)
  }
}

//Get books from the database
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({})
    res.status(200).json({ books })
  } catch (error) {
    next(error)
  }
}

//Get specific book from the database
const getBookById = async (req, res, next) => {
  const { id} = req.params
  try {
    const book = await Book.findById(id)
    res.status(200).json({ book })
  } catch (error) {
    next(error)
  }
}

//Update a book in the database
const updateBookById = async (req, res, next) => {
  const { id } = req.params
  const bookUpdate = { ...req.body, updatedAt: Date.now() }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, bookUpdate, {
      new: true,
      runValidators: true,
    })
    return res.status(200).json(updatedBook)
  } catch (error) {
    next(error)
  }
}

//Delete a book from the database using id
const deleteBookById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    return res.status(204).json(deletedBook)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
}