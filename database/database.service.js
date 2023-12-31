class DatabaseService {
	#db = {};
	#entity = null;

	constructor() {}

	createEntity(entity) {
		entity = entity.toLowerCase();
		if (!(entity in this.#db)) {
			this.#db[entity] = [];
		} else {
			throw new Error("Entity already exists");
		}

		this.setEntity(entity);
	}

	setEntity(entity) {
		this.#entity = entity.toLowerCase();
	}

	#checkEntity(entity = this.#entity) {
		entity = entity.toLowerCase();
		if (!Object.keys(this.#db).includes(entity)) {
			throw new Error("Entity does not exist");
		}
	}

	add(entity = this.#entity, record) {
		this.#checkEntity(entity);

		const index = this.#db[entity].findIndex((rec) => rec?.id === record.id);
		if (index === -1) {
			this.#db[entity].push(record);
			console.log("Record Added \n", record);
		} else {
			console.error("Record already Exists!!!\n");
			return;
		}

		return record;
	}

	init() {
		try {
			this.createEntity("person");
		} catch (e) {
		} finally {
			this.add("person", {
				id: "1",
				name: "Sam",
				age: "26",
				hobbies: [],
			});
		}
	}

	getAll(entity = this.#entity) {
		this.#checkEntity(entity);
		return this.#db[entity];
	}

	get(entity = this.#entity, id) {
		this.#checkEntity(entity);

		const index = this.#db[entity].findIndex((record) => record.id === id);

		if (index === -1) {
			throw new Error("Record not found");
		}

		return this.#db[entity][index];
	}

	update(entity = this.#entity, id, record) {
		this.#checkEntity(entity);

		const index = this.#db[entity].findIndex((record) => record.id === id);

		if (index === -1) {
			throw new Error("Record not found");
		}
		record.id = id;

		this.#db[entity][index] = record;

		return this.#db[entity][index];
	}

	delete(entity = this.#entity, id) {
		this.#checkEntity(entity);

		const index = this.#db[entity].findIndex((record) => record.id === id);

		if (index === -1) {
			throw new Error("Record not found");
		}
		const deleted = this.#db[entity][index];
		delete this.#db[entity][index];
		return deleted;
	}
}

const database = new DatabaseService();

export default database;
