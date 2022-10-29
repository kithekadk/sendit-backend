import Joi from "joi";

export const LoginValidator= Joi.object({
    email: Joi.string().required().email().message('Email must be a valid email'),
    password: Joi.string().required().min(8).message('Too long password')
})