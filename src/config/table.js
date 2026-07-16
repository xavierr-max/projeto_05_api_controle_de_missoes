import pool from './pool.js';

const createTable = async () => {
    try {
        await pool.query(`
           CREATE TABLE missao (
            codigo VARCHAR(20) PRIMARY KEY,
            titulo VARCHAR(100) NOT NULL,
            local VARCHAR(100) NOT NULL,
            status VARCHAR(30) NOT NULL
            );
        `);
    } catch (error) {
        console.error("Erro ao criar tabela de missões:", error);
    }
};

export default createTable;