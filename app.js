import bodyParser from "body-parser";
import express from "express";
import { errorMiddleware } from "./middleware/index.js";
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
		this.app.listen(environment.PORT, () => {
			console.log(`Server running on port ${environment.PORT}`);
		});
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
	}

	// connectToDatabase() {}
}

export default App;
