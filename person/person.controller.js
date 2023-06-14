import { Router } from "express";
import { PersonService } from "./person.service.js";
import { validatePersonMiddleware } from "./middleware/validatePerson.middleware.js";

class PersonController {
	path = "/person";
	router = Router();
	#personService;

	constructor() {
		this.#personService = new PersonService();
		this.#initializeRoutes();
	}

	#initializeRoutes() {
		this.router.get(this.path, this.#getAllPersons);
		this.router.get(`${this.path}/:personId`, this.#getPerson);
		this.router.post(this.path, validatePersonMiddleware, this.#createPerson);
		this.router.put(
			`${this.path}/:personId`,
			validatePersonMiddleware,
			this.#updatePerson
		);
		this.router.delete(`${this.path}/:personId`, this.#deletePerson);
		this.router.all(`${this.path}/*`, this.#notFound);
	}

	#notFound = (req, res) => {
		res.status(404).json({
			status: 404,
			message: "Not found",
		});
	};

	#getAllPersons = (req, res) => {
		try {
			const persons = this.#personService.getPersons();
			return res.status(200).json({
				status: 200,
				persons,
			});
		} catch (e) {
			console.error(e);
			return res.status(400).json({
				status: 400,
				message: e.message,
			});
		}
	};

	#getPerson = (req, res) => {
		const { personId } = req.params;

		try {
			const person = this.#personService.getPerson(personId);
			return res.status(200).json({
				status: 200,
				person,
			});
		} catch (e) {
			return res.status(400).json({
				status: 400,
				message: e.message,
			});
		}
	};

	#createPerson = (req, res) => {
		try {
			const person = this.#personService.createPerson(req.body);

			return res.status(201).json({
				status: 201,
				person,
			});
		} catch (e) {
			return res.status(400).json({
				status: 400,
				message: e.message,
			});
		}
	};

	#updatePerson = (req, res) => {
		const { personId } = req.params;

		try {
			const person = this.#personService.updatePerson(personId, req.body);

			return res.status(201).json({
				status: 201,
				person,
			});
		} catch (e) {
			return res.status(400).json({
				status: 400,
				message: e.message,
			});
		}
	};

	#deletePerson = (req, res) => {
		const { personId } = req.params;

		try {
			const person = this.#personService.deletePerson(personId);

			return res.status(201).json({
				status: 201,
				person,
			});
		} catch (e) {
			return res.status(400).json({
				status: 400,
				message: e.message,
			});
		}
	};
}

export default PersonController;
