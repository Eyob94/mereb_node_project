import express from "express";
import bodyParser from "body-parser";
import { loggerMiddleware } from "./middleware";
const app = express();

let persons = [
	{
		id: "1",
		name: "Sam",
		age: "26",
		hobbies: [],
	},
]; //This is your in memory database

app.set("db", persons);
//TODO: Implement crud of person

app.use(bodyParser.json());
app.use(loggerMiddleware);

if (require.main === module) {
	app.listen(3000);
}
module.exports = app;
