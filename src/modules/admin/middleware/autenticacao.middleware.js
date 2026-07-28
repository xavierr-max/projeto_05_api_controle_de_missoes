import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import e from 'express';

dotenv.config();

class AutenticacaoMiddleware {
    static autenticar(req, res, next) {
        const authedHeader = req.headers['authorization'];
        const token = authedHeader && authedHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }
            req.user = user;
            next();
        })
    }
}

export default AutenticacaoMiddleware;