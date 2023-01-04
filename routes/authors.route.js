const express = require("express")
const {AddAuthorValidationMw, UpdateAuthorValidationMw} = require("../validators/authors.validator")
const authorController = require ("../controllers/author.controller")

const authorRouter = express.Router()

authorRouter.get("/", authorController.getAllAuthors)

authorRouter.get("/:id", authorController.getAuthorByID)

authorRouter.post("/", AddAuthorValidationMw, authorController.addAuthor)

authorRouter.put("/:id", UpdateAuthorValidationMw, authorController.updateAuthorByID)

authorRouter.delete("/:id", authorController.deleteAuthorByID)

module.exports = authorRouter