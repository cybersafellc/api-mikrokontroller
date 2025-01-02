import { database } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import usersValidation from "../validations/users.validation.js";
import { validation } from "../validations/validation.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Response } from "../success/response.js";
import Jwt from "jsonwebtoken";

async function create(request) {
	const result = await validation(usersValidation.create, request);
	const count = await database.users.count({
		where: {
			username: result.username,
		},
	});
	if (count) {
		throw new ResponseError(400, "Username sudah terdaftar!");
	}
	result.id = await crypto.randomUUID();
	result.password = await bcrypt.hash(result.password, 10);
	const createRes = await database.users.create({
		data: result,
		select: {
			id: true,
			username: true,
			login_ip: true,
			email: true,
			created_at: true,
			update_at: true,
		},
	});
	return new Response(
		200,
		"Berhasil membuat akun!",
		createRes,
		"/login",
		false
	);
}

async function login(request) {
	const result = await validation(usersValidation.login, request);
	const user = await database.users.findFirst({
		where: {
			username: result.username,
		},
	});
	if (user && (await bcrypt.compare(result.password, user.password))) {
		await database.users.update({
			data: {
				login_ip: result.login_ip,
			},
			where: {
				id: user.id,
			},
		});
		const payload = {
			id: user.id,
			role: "user",
		};
		const access_token = await Jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return new Response(200, "Login Berhasil!", { access_token }, null, false);
	} else {
		throw new ResponseError(400, "Username atau Password salah!");
	}
}

async function authorization(request) {
	const result = await validation(usersValidation.authorization, request);
	return new Response(
		200,
		"verify authorization berhasil!",
		result,
		null,
		false
	);
}

async function getProfile(request) {
	const result = await validation(usersValidation.getProfile, request);
	const user = await database.users.findUnique({
		where: {
			id: result.id,
		},
		select: {
			id: true,
			username: true,
			email: true,
			login_ip: true,
			created_at: true,
			update_at: true,
		},
	});
	return new Response(200, "profile anda!", user, null, false);
}

export default { create, login, authorization, getProfile };
