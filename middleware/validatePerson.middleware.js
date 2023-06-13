import { PersonDto } from "../person/dto/index.js";

export const validatePersonMiddleware = (req, res, next) => {
	const { error, value } = PersonDto.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	} else {
		next();
	}
};
