import MissaoModel from "../models/missao.model.js";

class MissaoController {
    static async listarMissoes(req, res) {
        try {
            const missoes = await MissaoModel.listarMissoes();
            return res.status(200).json(missoes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao listar missões." });
        }
    }

    static async buscarMissaoPorCodigo(req, res) {
        try {
            const missao = await MissaoModel.buscarMissaoPorCodigo(req.params.codigo);

            if (!missao) {
                return res.status(404).json({ mensagem: "Missão não encontrada." });
            }

            return res.status(200).json(missao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao buscar missão." });
        }
    }

    static async cadastrarMissao(req, res) {
        const { codigo, titulo, local, status } = req.body;

        if (!codigo || !titulo || !local || !status) {
            return res.status(400).json({
                mensagem: "Preencha codigo, titulo, local e status."
            });
        }

        try {
            const missao = await MissaoModel.cadastrarMissao(req.body);
            return res.status(201).json(missao);
        } catch (error) {
            if (error.code === "23505") {
                return res.status(409).json({
                    mensagem: "Já existe uma missão com esse código."
                });
            }

            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao cadastrar missão." });
        }
    }

    static async atualizarMissaoTotal(req, res) {
        const { titulo, local, status } = req.body;

        if (!titulo || !local || !status) {
            return res.status(400).json({
                mensagem: "Preencha titulo, local e status."
            });
        }

        try {
            const missao = await MissaoModel.atualizarMissaoTotal(req.params.codigo, req.body);

            if (!missao) {
                return res.status(404).json({ mensagem: "Missão não encontrada." });
            }

            return res.status(200).json(missao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao atualizar missão." });
        }
    }

    static async atualizarMissaoParcial(req, res) {
        const { titulo, local, status } = req.body;

        if (!titulo && !local && !status) {
            return res.status(400).json({
                mensagem: "Informe ao menos um campo para atualizar: titulo, local ou status."
            });
        }

        try {
            const missao = await MissaoModel.atualizarMissaoParcial(
                req.params.codigo,
                req.body
            );

            if (!missao) {
                return res.status(404).json({ mensagem: "Missão não encontrada." });
            }

            return res.status(200).json(missao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao atualizar missão." });
        }
    }

    static async excluirMissao(req, res) {
        try {
            const missao = await MissaoModel.excluirMissao(req.params.codigo);

            if (!missao) {
                return res.status(404).json({ mensagem: "Missão não encontrada." });
            }

            return res.status(200).json({
                mensagem: "Missão excluída com sucesso.",
                missao
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao excluir missão." });
        }
    }

    static async excluirTodasMissoes(req, res) {
        try {
            const missoes = await MissaoModel.excluirTodasMissoes();

            return res.status(200).json({
                mensagem: "Todas as missões foram excluídas com sucesso.",
                quantidade: missoes.length,
                missoes
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao excluir missões." });
        }
    }
}

export default MissaoController;
