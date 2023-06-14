import DatabaseService from "../database/database.service.js";
import { personSchema } from "./person.schema.js";
import { v4 as uuidv4 } from "uuid";

export class PersonService {
	#databaseService = new DatabaseService();

	constructor() {
		this.#databaseService.createEntity("person");
	}

	#validate(record) {
		const { error } = personSchema.validate(record);

		if (error) {
			throw new Error("Invalid Person Record");
		}
	}

	createPerson(person) {
		this.#validate(person);
		person.id = uuidv4();
		return this.#databaseService.add("person", person);
	}
	getPersons() {
		return this.#databaseService.getAll("person");
	}

	getPerson(id) {
		return this.#databaseService.get("person", id);
	}

	updatePerson(id, person) {
		this.#validate(person);
		return this.#databaseService.update("person", id, person);
	}

	deletePerson(id) {
		return this.#databaseService.delete("person", id);
	}
}
