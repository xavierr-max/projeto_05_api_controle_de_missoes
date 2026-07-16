import express from 'express';
import dotenv from 'dotenv';
import router from './modules/missao/routers/missao.router.js';
import createTable from './config/table.js';

createTable(); // Chama a função para criar a tabela de missões

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORTA || 3000;

app.get('/', (req, res) => {
    const healthCheck = {
        status: 'online',
        mensagem: 'API REST DE CONTROLE DE MISSÕES operante',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} segundos`
    };

    res.status(200).json(healthCheck);
});

app.use(router);

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
