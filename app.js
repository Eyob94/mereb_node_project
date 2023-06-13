import bodyParser from "body-parser";
import express from "express";
import { errorMiddleware } from "./middleware";
import { PORT } from "./constants";

class App {
	constructor(controllers) {
		this.app = express();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	listen() {
		this.app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	}

	initializeMiddlewares() {
		this.app.use(bodyParser.json());
	}

	initializeControllers(controllers) {
		controllers.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}

	initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	// connectToDatabase() {}
}

export default App;
