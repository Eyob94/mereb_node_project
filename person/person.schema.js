import Joi from "joi";

export const personSchema = Joi.object({
	id: Joi.string().uuid().optional(),
	name: Joi.string().required(),
	age: Joi.number().required(),
	hobbies: Joi.array().items(Joi.string()).required(),
});

export const idSchema = Joi.object({
	id: Joi.string().uuid().required,
});
