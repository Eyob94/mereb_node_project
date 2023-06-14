import axios from "axios";
import { strict as assert } from "assert";
import database from "../database/database.service.js";
import { before } from "mocha";
import App from "../app.js";
import PersonController from "../person/person.controller.js";

let server;
let url;
describe("Test Person CRUD API", function () {
	before(() => {
		server = new App([new PersonController()]).listen();
		url = `http://localhost:${server.address().port}/person`;
	});
	beforeEach(() => {
		database.init();
	});

	after(() => {
		server.close();
	});

	it("Test Get", async function () {
		let res = await axios.get(url);
		let persons = database.getAll("person");
		assert.equal(res.status, 200);
		assert.deepEqual(persons, res.data.persons);
	});

	it("Test Get By ID", async function () {
		let res = await axios.get(`${url}/1`);
		let persons = database.getAll("person");
		assert.equal(res.status, 200);
		assert.deepEqual(persons[0], res.data.person);
	});

	it("Test Post", async () => {
		let newUser = {
			name: "keber",
			age: 24,
			hobbies: ["dubstep"],
		};

		let res = await axios.post(url, newUser);
		assert.equal(res.status, 201);
		let persons = database.getAll("person");

		let insertedUser = Object.assign({}, persons[1]);
		delete insertedUser.id;
		assert.deepEqual(insertedUser, newUser);
	});

	it("Test Post Validation All empty", async function () {
		let err;
		try {
			let res = await axios.post(url, {});
		} catch (e) {
			err = e;
		}
		console.log(err.response.data);
		assert.equal(err?.response?.status, 400);
	});

	it("Test Post Validation name empty", async function () {
		let err;
		try {
			let res = await axios.post(url, {
				age: 26,
				hobbies: [],
			});
		} catch (e) {
			err = e;
		}
		console.log(err.response.data);
		assert.equal(err?.response?.status, 400);
	});

	it("Test Post Validation age empty", async function () {
		let err;
		try {
			let res = await axios.post(url, {
				name: "sam",
				hobbies: [],
			});
		} catch (e) {
			err = e;
		}
		console.log(err.response.data);
		assert.equal(err?.response?.status, 400);
	});

	it("Test Post Validation age number", async function () {
		let err;
		try {
			let res = await axios.post(url, {
				name: "sam",
				age: "bad",
				hobbies: [],
			});
		} catch (e) {
			err = e;
		}
		console.log(err?.response?.data);
		assert.equal(err?.response?.status, 400);
	});

	it("Test Post Validation hobbies empty", async function () {
		let err;
		try {
			let res = await axios.post(url, {
				name: "sam",
				age: 21,
			});
		} catch (e) {
			err = e;
		}
		assert.equal(err?.response?.status, 400);
	});

	it("Test Post Validation hobbies array", async function () {
		let err;
		try {
			let res = await axios.post(url, {
				name: "sam",
				age: 21,
				hobbies: "fighting",
			});
		} catch (e) {
			err = e;
		}
		assert.equal(err?.response?.status, 400);
	});

	it("Test Put", async function () {
		let newUser = {
			name: "Sam",
			age: 26,
			hobbies: ["dubstep", "jazz"],
		};
		let res = await axios.put(`${url}/1`, newUser);

		let persons = database.getAll("person");
		newUser.id = "1";
		assert.deepEqual(persons[0], newUser);
	});

	it("Test delete", async function () {
		let res = await axios.delete(`${url}/1`);

		let persons = database.getAll("person");

		assert.deepEqual(
			persons.filter((p) => p.id == "1"),
			[]
		);
	});

	it("Test non existing user", async function () {
		let err;
		try {
			let res = await axios.get(`${url}/1`);
		} catch (e) {
			err = e;
		}
		assert.equal(err.response.status, 404);
	});

	it("Test non existing endpoint", async function () {
		let err;
		try {
			let res = await axios.get(`${url}/test/non-exiting/endpoint`);
		} catch (e) {
			err = e;
		}
		assert.equal(err.response.status, 404);
	});
});
