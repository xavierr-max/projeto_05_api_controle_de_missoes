import pool from './database.js';

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS missao (
                codigo VARCHAR(50) PRIMARY KEY,
                titulo VARCHAR(150) NOT NULL,
                local VARCHAR(150) NOT NULL,
                status VARCHAR(50) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS admins (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(150),
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                ativo BOOLEAN NOT NULL DEFAULT TRUE
            );
        `);
    } catch (error) {
        console.error("Erro ao criar tabela de missões:", error);
        throw error;
    }
};

export default createTable;
