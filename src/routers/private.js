import express from "express";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import usersController from "../controllers/users.controller.js";
import trashController from "../controllers/trash.controller.js";

const router = express.Router();
router.get(
	"/users/auth/verify",
	authorizationMiddleware.user,
	usersController.authorization
);
router.get(
	"/users/profile",
	authorizationMiddleware.user,
	usersController.getProfile
);

//router service
router.post("/trash", authorizationMiddleware.user, trashController.create);
router.get("/trash", authorizationMiddleware.user, trashController.getAll);
router.put(
	"/trash/disabled",
	authorizationMiddleware.user,
	trashController.disabled
);
router.put(
	"/trash/enebled",
	authorizationMiddleware.user,
	trashController.enebled
);
router.put("/trash/reset", authorizationMiddleware.user, trashController.reset);
router.delete("/trash", authorizationMiddleware.user, trashController.deletes);
export default router;
