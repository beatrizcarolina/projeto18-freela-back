import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    phone: joi.string().min(10).max(11).pattern(/^\d+$/).required(),
    cpf: joi.string().length(11).pattern(/^\d+$/).required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().min(3).required()
});

export const adressSchema = joi.object({
    cep: joi.string().length(8).pattern(/^\d+$/).required(),
    state: joi.string().length(2).pattern(/^[A-Za-z]{2}$/).required(),
    city: joi.string().required(),
    address: joi.string().required()
})

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});