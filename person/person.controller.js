import { Router } from "express";

class PersonController {
	path = "/person";
	router = Router();

	constructor() {
		this.#initializeRoutes();
	}

	#initializeRoutes() {}

	#getAllPersons() {}
}

export default PersonController;
