import Jwt from "jsonwebtoken";
import { ResponseError } from "../errors/response-error.js";
import { database } from "../app/database.js";

async function user(req, res, next) {
	try {
		const access_token = await req.headers["authorization"]?.split(" ")[1];
		const decode = Jwt.verify(
			access_token,
			process.env.JWT_SECRET,
			(err, decode) => {
				return decode;
			}
		);
		if (!decode) throw new ResponseError(400, "invalid access_token!");
		const user = await database.users.count({
			where: {
				id: decode.id,
			},
		});
		if (!user) throw new ResponseError(400, "akun anda di kunci!");
		req.body.id = await decode.id;
		req.body.role = await decode.role;
		next();
	} catch (error) {
		next(error);
	}
}

export default { user };
