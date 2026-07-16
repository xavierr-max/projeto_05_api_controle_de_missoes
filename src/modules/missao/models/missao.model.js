import pool from "../../../config/database.js";

class MissaoModel {
    static async cadastrarMissao({ codigo, titulo, local, status }) {
        const query = `
            INSERT INTO missao (codigo, titulo, local, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;

        const resultado = await pool.query(query, [codigo, titulo, local, status]);
        return resultado.rows[0];
    }

    static async listarMissoes() {
        const resultado = await pool.query("SELECT * FROM missao ORDER BY codigo");
        return resultado.rows;
    }

    static async buscarMissaoPorCodigo(codigo) {
        const resultado = await pool.query(
            "SELECT * FROM missao WHERE codigo = $1",
            [codigo]
        );

        return resultado.rows[0] || null;
    }

    static async atualizarMissaoTotal(codigo, { titulo, local, status }) {
        const query = `
            UPDATE missao
            SET titulo = $2,
                local = $3,
                status = $4
            WHERE codigo = $1
            RETURNING *`;

        const resultado = await pool.query(query, [codigo, titulo, local, status]);
        return resultado.rows[0] || null;
    }

    static async atualizarMissaoParcial(codigo, dados) {
        const query = `
            UPDATE missao
            SET titulo = COALESCE($2, titulo),
                local = COALESCE($3, local),
                status = COALESCE($4, status)
            WHERE codigo = $1
            RETURNING *`;

        const valores = [
            codigo,
            dados.titulo ?? null,
            dados.local ?? null,
            dados.status ?? null
        ];

        const resultado = await pool.query(query, valores);
        return resultado.rows[0] || null;
    }

    static async excluirMissao(codigo) {
        const resultado = await pool.query(
            "DELETE FROM missao WHERE codigo = $1 RETURNING *",
            [codigo]
        );

        return resultado.rows[0] || null;
    }

    static async excluirTodasMissoes() {
        const resultado = await pool.query("DELETE FROM missao RETURNING *");
        return resultado.rows;
    }
}

export default MissaoModel;
