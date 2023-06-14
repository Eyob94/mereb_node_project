import { personSchema } from "../person.schema.js";

export const validatePersonMiddleware = (req, res, next) => {
	const { error, value } = personSchema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ status: 400, error: error.details[0].message });
	} else {
		next();
	}
};
