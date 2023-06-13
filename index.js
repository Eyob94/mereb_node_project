import App from "./app.js";
import { validateEnv } from "./utils/validateEnv.js";

validateEnv();

const app = new App();

app.listen();
