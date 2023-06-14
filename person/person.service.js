import database from "../database/database.service.js";
import { personSchema } from "./person.schema.js";
import { v4 as uuidv4 } from "uuid";

export class PersonService {
	#database = database;

	constructor() {
		this.#database.init();
	}

	#validate(record) {
		const { error } = personSchema.validate(record);

		if (error) {
			throw new Error("Invalid Person Record");
		}
	}

	createPerson(person) {
		this.#validate(person);
		if (!person.id) person.id = uuidv4();
		return this.#database.add("person", person);
	}
	getPersons() {
		return this.#database.getAll("person");
	}

	getPerson(id) {
		return this.#database.get("person", id);
	}

	updatePerson(id, person) {
		this.#validate(person);
		return this.#database.update("person", id, person);
	}

	deletePerson(id) {
		return this.#database.delete("person", id);
	}
}
