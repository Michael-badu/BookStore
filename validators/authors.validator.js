const Joi = require ("joi");
const getCurrentYear = require ("./currentyear")

const authorAddSchema = Joi.object({
    firstName: Joi.string()
        .max(255)
        .trim()
        .required(),
    lastName: Joi.string()
        .max(255)
        .required()
        .trim(),
    dob: Joi.date()
        .greater("1-1-1900")
        .required()
        .less("1-1-2023"),
    country: Joi.string()
        .optional(),
    books: Joi.array()
        .items(Joi.string())
        .optional(),
    cretedAt: Joi.date()
        .default(Date.now),
    updatedAt: Joi.date()
        .default(Date.now),
})

const authorUpdateSchema = Joi.object({
    firstName: Joi.string()
        .max(255)
        .trim(),
    lastName: Joi.string()
        .max(255)
        .trim(),
    dob: Joi.date()
        .min(1900)
        .max(getCurrentYear.getCurrentYear()),
    country: Joi.string()
        .optional(),
    books: Joi.array()
        .items(Joi.string())
        .optional(),
})

async function AddAuthorValidationMw (req, res, next) {
    const authorPayLoad = req.body

    try{
        await authorAddSchema.validateAsync(authorPayLoad)
        next()
    } catch (error) {
        next({
            message: error,
            status: 406
    })
    }
}

async function UpdateAuthorValidationMw(req, res, next) {
    const authorPayLoad = req.body
    try{
        await authorUpdateSchema.validateAsync(authorPayLoad)
        next()
    } catch (error) {
        next({
            message: error,
            status: 406
    })
    }
}

module.exports = {
    AddAuthorValidationMw,
    UpdateAuthorValidationMw
}