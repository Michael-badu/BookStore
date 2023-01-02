const Joi = require ("joi");
const getCurrentYear = require ("./currentyear")

const bookSchema = Joi.object({
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

async function BookValidationMw(req, res, next){
    const bookPayLoad = req.body

    try{
        await bookSchema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    BookValidationMw
}