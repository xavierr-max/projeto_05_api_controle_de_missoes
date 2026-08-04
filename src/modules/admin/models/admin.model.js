import pool from '../../../config/database.js';

class AdminModel {
    static async cadastrar({ nome, email, senha }) {
        const query = `
            INSERT INTO admins (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING *`;

        const resultado = await pool.query(query, [nome, email, senha]);
        return resultado.rows[0];
    }

    static async contarAdmins() {
        const query = `SELECT COUNT(*) FROM admins`;

        const resultado = await pool.query(query);
        return Number(resultado.rows[0].count);
    }

    static async buscarPorEmail(email) {
        const query = `SELECT id, nome, email, senha, ativo FROM admins WHERE email = $1`;

        const resultado = await pool.query(query, [email]);
        return resultado.rows[0];
    }

    static async adminAtivos() {
        const query = `SELECT COUNT(*) FROM admins WHERE ativo = true`;

        const resultado = await pool.query(query);
        return Number(resultado.rows[0].count);
    }

    static async buscarPorId(id) {
        const query = `SELECT id, nome, email, ativo FROM admins WHERE id = $1`;

        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }

}

export default AdminModel;
