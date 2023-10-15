import Joi from "joi"


export const instanceStateSchema = Joi.object({
    user:Joi.object({
        username:Joi.string().required(),
        proxy:Joi.string().allow(null).required(),
    }).required(),
    client:Joi.object({
        isBooted:Joi.boolean().required(),
        isSocketConnected:Joi.boolean().required(),
    }).required()
})