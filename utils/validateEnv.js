import dotenv from "dotenv";
import { envSchema } from "../interface";

dotenv.config();

export const validateEnv = () => {
	envSchema.validate(process.env);
};
