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
                id VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
                nome VARCHAR(150),
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                ativo BOOLEAN NOT NULL DEFAULT TRUE
            );

            ALTER TABLE admins
                ADD COLUMN IF NOT EXISTS ativo BOOLEAN NOT NULL DEFAULT TRUE;

            ALTER TABLE admins
                ALTER COLUMN id SET DEFAULT gen_random_uuid()::text,
                ALTER COLUMN nome DROP NOT NULL,
                ALTER COLUMN ativo SET DEFAULT TRUE,
                ALTER COLUMN ativo SET NOT NULL;
        `);
    } catch (error) {
        console.error("Erro ao criar tabela de missões:", error);
        throw error;
    }
};

export default createTable;
