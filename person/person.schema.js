import Joi from "joi";

export const personSchema = Joi.object({
	name: Joi.string().required(),
	age: Joi.number().required(),
	hobbies: Joi.array().items(Joi.string()).optional(),
});

export const idSchema = Joi.object({
	id: Joi.string().uuid().required,
});
