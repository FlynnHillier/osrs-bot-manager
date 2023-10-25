import Joi from "joi"


export const instanceStateSchema = Joi.object({
    user:Joi.object({
        username:Joi.string().required(),
        proxy:Joi.string().allow(null).required(),
    }).required(),
    client:Joi.object({
        isActive:Joi.boolean().required(),
        isSocketConnected:Joi.boolean().required(),
        queue:Joi.object({
            isQueued:Joi.boolean().required(),
            position:Joi.number().required(),
        })
    }).required()
})