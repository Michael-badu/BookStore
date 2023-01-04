const Joi = require ("joi");
const getCurrentYear = require ("./currentyear")

const bookAddSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    shortDescription: Joi.string()
        .min(5)
        .max(360)
        .optional()
        .trim(),
    longDescription: Joi.string()
        .min(10)
        .optional()
        .trim(),
    year: Joi.number()
        .integer()
        .required()
        .max(getCurrentYear.getCurrentYear()),
    isbn: Joi.number()
        .integer()
        .required(),
    price: Joi.number()
        .min(0)
        .required(),
    cretedAt: Joi.date()
        .default(Date.now),
    updatedAt: Joi.date()
    .default(Date.now),
})

const bookUpdateSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim(),
    shortDescription: Joi.string()
        .min(5)
        .max(360)
        .trim(),
    longDescription: Joi.string()
        .min(10)
        .trim(),
    year: Joi.number()
        .integer()
        .max(getCurrentYear.getCurrentYear()),
    isbn: Joi.number()
        .integer(),
    price: Joi.number()
        .min(0)
        .required(),
    cretedAt: Joi.date()
        .default(Date.now),
    updatedAt: Joi.date()
    .default(Date.now),
})

async function AddBookValidationMw (req, res, next) {
    const bookPayLoad = req.body

    try{
        await bookAddSchema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details(0).message,
            status: 406
    })
    }
}

async function UpdateBookValidationMw(req, res, next) {
    const bookPayLoad = req.body
    try{
        await bookUpdateSchema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next({
            message: error,
            status: 406
    })
    }
}

module.exports = {
    AddBookValidationMw,
    UpdateBookValidationMw
}