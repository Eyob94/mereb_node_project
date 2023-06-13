import * as Joi from "joi";

export const PersonDto = Joi.object({
	name: Joi.string().required(),
	age: Joi.number().required(),
	hobbies: Joi.array().items(Joi.string()).required(),
});
