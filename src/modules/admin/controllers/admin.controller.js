import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,32}$/;

class AdminController {
    static async cadastrar(req, res) {
        try {
            const { id, nome, email, senha } = req.body;

            if (!id || !nome || !email || !senha) {
                return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
            }

            if (!regex.test(senha)) {
                return res.status(400).json({
                    mensagem: "Senha inválida! Use de 8 a 32 caracteres, com ao menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial, sem espaços."
                });
            }

            const totalAdmin = await AdminModel.contarAdmins();
            if (totalAdmin >= 1) {
                return res.status(409).json({ mensagem: "Administrador já existe" });
            }

            //const salt = bcrypt.genSaltSync(10);
            //const hashSenha = bcrypt.hashSync(senha, salt);
            const senhaHash = await bcrypt.hash(senha, 10);

            const admin = await AdminModel.cadastrar({ id, nome, email, senha: senhaHash });

            // ":" é utilizado para atrubuição "=" para objetos em js
            return res.status(201).json({
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao cadastrar administrador" });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha)
                return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });

            const admin = await AdminModel.buscarPorEmail(email);
            if (!admin)
                return res.status(401).json({ mensagem: "Credenciais inválidas" });

            const senhaValida = await bcrypt.compare(senha, admin.senha);
            if (!senhaValida)
                return res.status(401).json({ mensagem: "Credenciais inválidas" });

            const token = jwt.sign(
                {  // payload
                    id: admin.id, // claims
                    nome: admin.nome,
                    email: admin.email
                },
                process.env.JWT_SECRET, // secret key
                {
                    expiresIn: process.env.JWT_TEMPO_EXPIRACAO // tempo de expiração
                }
            );

            return res.status(200).json({
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao realizar login" });
        }
    }

    static async perfil(req, res) {
        try {
            const authorization = req.headers.authorization;

            if (!authorization?.startsWith("Bearer ")) {
                return res.status(401).json({ mensagem: "Token não informado" });
            }

            const token = authorization.slice(7).trim();

            if (!token) {
                return res.status(401).json({ mensagem: "Token não informado" });
            }

            let usuario;

            try {
                usuario = jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                return res.status(401).json({ mensagem: "Token inválido ou expirado" });
            }

            const admin = await AdminModel.buscarPorId(usuario.id);

            if (!admin) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" });
            }

            return res.status(200).json(admin);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro ao buscar perfil" });
        }
    }
}
export default AdminController;
