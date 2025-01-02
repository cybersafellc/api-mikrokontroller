import { ResponseError } from "../errors/response-error.js";
import { Response } from "../success/response.js";

async function notFound(req, res, next) {
	try {
		throw new ResponseError(400, "route not found");
	} catch (error) {
		next(error);
	}
}

async function errorHandler(err, req, res, next) {
	if (!err) {
		next();
		return;
	}
	if (err instanceof ResponseError) {
		const response = new Response(err.status, err.message, null, null, true);
		res.status(response.status).json(response).end();
	} else {
		const response = new Response(500, err.message, null, null, true);
		res.status(response.status).json(response).end();
	}
}

export default { notFound, errorHandler };
