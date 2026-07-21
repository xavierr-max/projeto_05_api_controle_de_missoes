# Controle de Missões — API

API REST em Express para gerenciar missões armazenadas em PostgreSQL. É consumida pelo frontend React publicado na Vercel.

## Endereços de produção

- API: https://projeto-05-api-controle-de-missoes.onrender.com
- Frontend: https://projeto-05-front-controle-de-missoe.vercel.app

> A instância gratuita do Render pode entrar em suspensão por inatividade. A primeira requisição após esse período pode levar cerca de 50 segundos.

## Executar localmente

```powershell
npm install
npm run dev
```

Por padrão, a API usa `http://localhost:3000`.

## Variáveis de ambiente

Crie um arquivo `.env` local ou configure as variáveis no Render:

```env
PGUSER=usuario
PGHOST=host-do-postgres
PGDATABASE=nome-do-banco
PGPASSWORD=senha
PGPORT=5432
PORT=3000
FRONTEND_URL=https://frontend-adicional.exemplo.com
```

- `PGUSER`, `PGHOST`, `PGDATABASE`, `PGPASSWORD` e `PGPORT`: dados de conexão com o PostgreSQL.
- `PORT`: porta fornecida pelo Render; localmente o padrão é `3000`.
- `PORTA`: alternativa mantida para compatibilidade local.
- `FRONTEND_URL`: origens adicionais permitidas pelo CORS, separadas por vírgula.

O frontend local, o domínio oficial da Vercel e os previews desse projeto já são permitidos pelo código.

## Inicialização do banco

Antes de iniciar o servidor HTTP, a API executa uma criação idempotente da tabela `missao` com `CREATE TABLE IF NOT EXISTS`. A inicialização é aguardada, então o serviço não começa a aceitar requisições antes de confirmar o acesso ao PostgreSQL.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verifica o estado da API |
| GET | `/missoes/listar` | Lista todas as missões |
| GET | `/missoes/listar/:codigo` | Busca uma missão |
| POST | `/missoes/cadastrar` | Cadastra uma missão |
| PUT | `/missoes/editar/total/:codigo` | Substitui os campos editáveis |
| PATCH | `/missoes/editar/parcial/:codigo` | Atualiza campos específicos |
| DELETE | `/missoes/excluir/:codigo` | Exclui uma missão |
| DELETE | `/missoes/excluir/todos` | Exclui todas as missões |

Exemplo de cadastro:

```json
{
  "codigo": "MIS-001",
  "titulo": "Operação Aurora",
  "local": "São Paulo",
  "status": "Planejada"
}
```

O frontend usa `GET /missoes/listar/:codigo` para carregar a página exclusiva de edição e `PUT /missoes/editar/total/:codigo` para salvar título, local e status.

## Comandos

```powershell
npm start      # inicia a API
npm run dev    # inicia com observação de arquivos
npm run check  # valida a sintaxe dos arquivos JavaScript
```

## Deploy no Render

O serviço acompanha a branch `main` do GitHub. A configuração esperada é:

- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/`

O Render define `PORT` automaticamente. Depois de cada push, acompanhe os eventos até o deploy ficar com o estado `Live`.
