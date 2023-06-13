import Joi from "joi";

export const envSchema = Joi.object({
	PORT: Joi.number().required(),
}).unknown(true);
