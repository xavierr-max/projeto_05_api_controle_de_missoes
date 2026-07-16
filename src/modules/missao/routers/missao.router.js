import express from "express";
import MissaoController from "../controllers/missao.controller.js";

const router = express.Router();

router.post("/missoes/cadastrar", MissaoController.cadastrarMissao);
router.get("/missoes/listar", MissaoController.listarMissoes);
router.get("/missoes/listar/:codigo", MissaoController.buscarMissaoPorCodigo);
router.put("/missoes/editar/total/:codigo", MissaoController.atualizarMissaoTotal);
router.patch("/missoes/editar/parcial/:codigo", MissaoController.atualizarMissaoParcial);
router.delete("/missoes/excluir/todos", MissaoController.excluirTodasMissoes);
router.delete("/missoes/excluir/:codigo", MissaoController.excluirMissao);

export default router;
