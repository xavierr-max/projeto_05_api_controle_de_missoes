import express from "express";
import AdminController from "../controllers/admin.controller.js";
import AutenticacaoMiddleware from "../middleware/autenticacao.middleware.js";

const router = express.Router();

router.post("/cadastrar", AdminController.cadastrar);
router.post("/login", AdminController.login);
router.get("/perfil", AutenticacaoMiddleware.autenticar, AdminController.perfil);

export default router;
