import express from "express";
import usersController from "../controllers/users.controller.js";
import trashController from "../controllers/trash.controller.js";

const router = express.Router();
router.post("/users", usersController.create);
router.post("/users/auth", usersController.login);

// trash service
router.get("/trash/:id", trashController.getById);
router.post("/trash/organik", trashController.organik);
router.post("/trash/anorganik", trashController.anOrganik);
export default router;
