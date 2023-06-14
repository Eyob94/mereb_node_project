export const notFoundMiddleware = (req, res) => {
	res.status(404).json({ error: "Endpoint not found" });
};
