import Joi from "joi";

const create = Joi.object({
	name: Joi.string().required(),
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const getAll = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
	take: Joi.number().required(),
	page: Joi.number().required(),
});

const disabled = Joi.object({
	trash_id: Joi.string().required(),
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const enebled = Joi.object({
	trash_id: Joi.string().required(),
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const reset = Joi.object({
	trash_id: Joi.string().required(),
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const getById = Joi.object({
	id: Joi.string().required(),
	arduino: Joi.boolean(),
});

const organik = Joi.object({
	trash_id: Joi.string().required(),
	distance: Joi.number().required(),
});

const anOrganik = Joi.object({
	trash_id: Joi.string().required(),
	distance: Joi.number().required(),
});

const deletes = Joi.object({
	trash_id: Joi.string().required(),
	id: Joi.string().required(),
	role: Joi.string().required(),
});

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
