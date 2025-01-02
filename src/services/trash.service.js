import { database } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import { Response } from "../success/response.js";
import trashValidation from "../validations/trash.validation.js";
import { validation } from "../validations/validation.js";
import crypto from "crypto";

async function create(request) {
	const result = await validation(trashValidation.create, request);
	const count = await database.trash.count({
		where: {
			name: result.name,
		},
	});
	if (count)
		throw new ResponseError(400, "tong sampah dengan nama tersebut sudah ada!");
	result.id = undefined;
	result.role = undefined;
	result.id = crypto.randomUUID();
	result.status = true;
	result.reset = false;
	const createRes = await database.trash.create({
		data: result,
	});
	return new Response(
		200,
		"berhasil menambahkan tong sampah",
		createRes,
		null,
		false
	);
}

async function getAll(request) {
	const result = await validation(trashValidation.getAll, request);
	result.skip = (result.page - 1) * result.take;
	let response = {};
	response.data = await database.trash.findMany({
		skip: result.skip,
		take: result.take,
		orderBy: {
			created_at: "desc",
		},
	});
	response.data = await Promise.all(
		response.data.map(async (data) => {
			data.organik_count = await database.organik.count({
				where: {
					trash_id: data.id,
				},
			});
			data.an_organik_count = await database.an_organik.count({
				where: {
					trash_id: data.id,
				},
			});
			return data;
		})
	);

	const count = await database.trash.count();
	response.pagination_info = {
		max_page: Math.ceil(count / result.take),
		page: result.page,
		take: result.take,
	};
	return new Response(200, "lists tong sampah", response, null, false);
}

async function disabled(request) {
	const result = await validation(trashValidation.disabled, request);
	const count = await database.trash.count({
		where: {
			id: result.trash_id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid!");
	const updateRes = await database.trash.update({
		data: {
			status: false,
		},
		where: {
			id: result.trash_id,
		},
	});
	return new Response(
		200,
		"berhasil mematikan tong sampah",
		updateRes,
		null,
		false
	);
}

async function enebled(request) {
	const result = await validation(trashValidation.enebled, request);
	const count = await database.trash.count({
		where: {
			id: result.trash_id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid");
	const updateRes = await database.trash.update({
		data: {
			status: true,
		},
		where: {
			id: result.trash_id,
		},
	});
	return new Response(
		200,
		"berhasil menghidupkan tong sampah",
		updateRes,
		null,
		false
	);
}

async function reset(request) {
	const result = await validation(trashValidation.reset, request);
	const count = await database.trash.count({
		where: {
			id: result.trash_id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid!");
	const updateRes = await database.trash.update({
		data: {
			reset: true,
		},
		where: {
			id: result.trash_id,
		},
	});
	return new Response(
		200,
		"berhasil reset tong sampah",
		updateRes,
		null,
		false
	);
}

async function getById(request) {
	const result = await validation(trashValidation.getById, request);
	const count = await database.trash.count({
		where: {
			id: result.id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid!");
	if (result.arduino) {
		const trash = await database.trash.findUnique({
			where: {
				id: result.id,
			},
		});
		await database.trash.update({
			data: {
				reset: false,
			},
			where: {
				id: result.id,
			},
		});
		return new Response(200, "berhasil!", trash, null, false);
	} else {
		const trash = await database.trash.findUnique({
			where: {
				id: result.id,
			},
			include: {
				organik: {
					orderBy: {
						created_at: "desc",
					},
				},
				an_organik: {
					orderBy: {
						created_at: "desc",
					},
				},
			},
		});
		return new Response(200, "berhasil!", trash, null, false);
	}
}

async function organik(request) {
	const result = await validation(trashValidation.organik, request);
	const count = await database.trash.count({
		where: {
			id: result.trash_id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid!");
	const data = {
		id: crypto.randomUUID(),
		trash_id: result.trash_id,
		distance: result.distance,
	};
	const createRes = await database.organik.create({
		data: data,
	});
	return new Response(200, "data diterima!", createRes, null, false);
}

async function anOrganik(request) {
	const result = await validation(trashValidation.anOrganik, request);
	const count = await database.trash.count({
		where: {
			id: result.trash_id,
		},
	});
	if (!count) throw new ResponseError(400, "trash_id tidak valid!");
	const data = {
		id: crypto.randomUUID(),
		trash_id: result.trash_id,
		distance: result.distance,
	};
	const createRes = await database.an_organik.create({
		data: data,
	});
	return new Response(200, "data diterima!", createRes, null, false);
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
};
