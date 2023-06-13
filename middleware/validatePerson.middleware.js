import { PersonDto } from "../dto";

export const validatePerson = (req, res, next) => {
	const { error, value } = PersonDto.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	} else {
		next();
	}
};
