import express from "express";
import AdminController from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin/cadastrar", AdminController.cadastrar);
router.post("/admin/login", AdminController.login);
router.get("/admin/perfil", AdminController.perfil);

export default router;
