import joi from "joi";

export const productsSchema = joi.object({
    name: joi.string().max(30).required(),
    description: joi.string().required(),
    category: joi.number().integer().required(),
    price: joi.number().min(0).required(),
    photo: joi.string().uri().required()    
});