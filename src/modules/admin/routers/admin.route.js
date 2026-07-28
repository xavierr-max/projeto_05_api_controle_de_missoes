import express from "express";
import AdminController from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/cadastrar", AdminController.cadastrar);
router.post("/login", AdminController.login);
router.get("/perfil", AdminController.perfil);

export default router;
