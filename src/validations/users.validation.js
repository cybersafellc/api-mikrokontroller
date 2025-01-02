import Joi from "joi";

const create = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().required(),
	login_ip: Joi.string().required(),
});

const login = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	login_ip: Joi.string().required(),
});

const authorization = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const getProfile = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
});

export default { create, login, authorization, getProfile };
