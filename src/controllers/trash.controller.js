import trashService from "../services/trash.service.js";

async function create(req, res, next) {
	try {
		const response = await trashService.create(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function getAll(req, res, next) {
	try {
		req.body.page = req?.query?.page > 0 ? req.query.page : 1;
		req.body.take = req?.query?.take > 10 ? req.query.take : 10;
		const response = await trashService.getAll(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function disabled(req, res, next) {
	try {
		const response = await trashService.disabled(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function enebled(req, res, next) {
	try {
		const response = await trashService.enebled(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function reset(req, res, next) {
	try {
		const response = await trashService.reset(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function getById(req, res, next) {
	try {
		req.body.id = await req?.params?.id;
		req.body.arduino = await req?.query?.arduino;
		const response = await trashService.getById(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function organik(req, res, next) {
	try {
		const response = await trashService.organik(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function anOrganik(req, res, next) {
	try {
		const response = await trashService.anOrganik(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function deletes(req, res, next) {
	try {
		const response = await trashService.deletes(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

export default {
	create,
	getAll,
	disabled,
	enebled,
	reset,
	getById,
	organik,
	anOrganik,
	deletes,
};
