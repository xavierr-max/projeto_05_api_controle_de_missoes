import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";

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

            const senhaHash = await bcrypt.hash(senha, 10);
            const admin = await AdminModel.cadastrar({ id, nome, email, senha: senhaHash });

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
}

export default AdminController;
