import bodyParser from "body-parser";
import express from "express";
import { errorMiddleware, notFoundMiddleware } from "./middleware/index.js";
import environment from "./constants/index.js";
import cors from "cors";

class App {
	constructor(controllers) {
		this.app = express();
		this.#initializeMiddlewares();
		this.#initializeControllers(controllers);
		this.#initializeErrorHandling();
	}

	listen() {
		this.server = this.app.listen(environment.PORT, () => {
			console.log(`Server running on port ${environment.PORT}`);
		});
		return this.server;
	}

	close() {
		this.server.close();
	}

	#initializeMiddlewares() {
		this.app.use(cors());
		this.app.use(bodyParser.json());
	}

	#initializeControllers(controllers) {
		controllers?.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}

	#initializeErrorHandling() {
		this.app.use(errorMiddleware);
		this.app.use(notFoundMiddleware);
	}
}

export default App;
