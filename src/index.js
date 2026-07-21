import express from 'express';
import dotenv from 'dotenv';
import router from './modules/missao/routers/missao.router.js';
import createTable from './config/table.js';

createTable(); // Chama a função para criar a tabela de missões

dotenv.config();

const app = express();

const origensPermitidas = new Set([
    'http://localhost:5173',
    'https://projeto-05-front-controle-de-missoe.vercel.app',
    ...(process.env.FRONTEND_URL || '')
        .split(',')
        .map((origem) => origem.trim().replace(/\/$/, ''))
        .filter(Boolean)
]);

app.use((req, res, next) => {
    const origem = req.headers.origin;
    const ehPreviewVercel = /^https:\/\/projeto-05-front-controle-de-missoes-[a-z0-9-]+-maxwell-xavier\.vercel\.app$/.test(origem || '');
    const origemPermitida = origem && (origensPermitidas.has(origem) || ehPreviewVercel);

    if (origemPermitida) {
        res.header('Access-Control-Allow-Origin', origem);
        res.header('Vary', 'Origin');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(origemPermitida ? 204 : 403);
    }

    next();
});

app.use(express.json());

const port = process.env.PORT || process.env.PORTA || 3000;

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
