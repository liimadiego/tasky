import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';

dotenv.config({
    allowEmptyValues: true
});

function verifyTokenJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token foi provido' });

    try {
        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token', err, token });

            req.userId = decoded.id;
            next();
        });
    } catch (err) {
        return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token' });
    }
}

export { verifyTokenJWT };