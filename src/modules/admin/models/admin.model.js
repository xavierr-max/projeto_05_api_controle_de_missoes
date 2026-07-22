import pool from '../../../config/database.js';

class AdminModel {
    static async cadastrar({ id, nome, email, senha }) {
        const query = `
            INSERT INTO admins (id, nome, email, senha)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;

        const resultado = await pool.query(query, [id, nome, email, senha]);
        return resultado.rows[0];
    }

    static async contarAdmins() {
        const query = `SELECT COUNT(*) FROM admins`;

        const resultado = await pool.query(query);
        return Number(resultado.rows[0].count);
    }

    static async buscarPorEmail(email) {
        const query = `SELECT id, nome, email, senha FROM admins WHERE email = $1`;

        const resultado = await pool.query(query, [email]);
        return resultado.rows[0];
    }

}

export default AdminModel;
