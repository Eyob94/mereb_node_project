import App from "./app.js";
import PersonController from "./person/person.controller.js";
import { validateEnv } from "./utils/validateEnv.js";

validateEnv();

const app = new App([new PersonController()]);

app.listen();
