import http from "http";
import web from "./app/web.js";
import dotenv from "dotenv";
import { logger } from "./app/logging.js";
dotenv.config();
const port = process.env.PORT || 3000;

const server = http.createServer(web);
server.listen(port, function () {
	logger.info(`server running on port ${port}`);
});
