import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AutenticacaoMiddleware {
    static autenticar(req, res, next) {
        const authorization = req.headers.authorization;

        if (!authorization?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        const token = authorization.slice(7).trim();

        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }

            req.user = user;
            next();
        });
    }
}

export default AutenticacaoMiddleware;
