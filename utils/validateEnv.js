import environment from "../constants/index.js";
import { envSchema } from "../interface/index.js";

export const validateEnv = () => {
	const { error } = envSchema.validate(environment);
	if (error) {
		throw new Error(error.details?.[0]?.message);
	}
};
