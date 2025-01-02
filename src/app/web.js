import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "../middlewares/error.middleware.js";
import privateRoute from "../routers/private.js";
import publicRoute from "../routers/public.js";

const web = express();
web.set("trust proxy", true);
web.use(cors());
web.use(cookieParser());
web.use(bodyParser.json());

web.use(publicRoute);
web.use(privateRoute);

web.use(errorMiddleware.notFound);
web.use(errorMiddleware.errorHandler);
export default web;
