import express from "express";
import MissaoController from "../controllers/missao.controller.js";
import AutenticacaoMiddleware from "../../admin/middleware/autenticacao.middleware.js";

const router = express.Router();

router.post("/missoes/cadastrar", AutenticacaoMiddleware.autenticar, MissaoController.cadastrarMissao);
router.get("/missoes/listar", AutenticacaoMiddleware.autenticar, MissaoController.listarMissoes);
router.get("/missoes/listar/:codigo", AutenticacaoMiddleware.autenticar, MissaoController.buscarMissaoPorCodigo);
router.put("/missoes/editar/total/:codigo", AutenticacaoMiddleware.autenticar, MissaoController.atualizarMissaoTotal);
router.patch("/missoes/editar/parcial/:codigo", AutenticacaoMiddleware.autenticar, MissaoController.atualizarMissaoParcial);
router.delete("/missoes/excluir/todos", AutenticacaoMiddleware.autenticar, MissaoController.excluirTodasMissoes);
router.delete("/missoes/excluir/:codigo", AutenticacaoMiddleware.autenticar, MissaoController.excluirMissao);

export default router;
