import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';

dotenv.config({
    allowEmptyValues: true
});

const router = Router();

router.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
})

router.post('/login', (req, res, next) => {
    if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'Usuário/senha não informados!' });
    }
    //essa validação deve ser feita em um banco de dados
    //porem para simplificar o exemplo, vamos deixar fixo
    if (req.body.user === 'test@test.com' && req.body.password == 'test') {
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 24 * 60 * 60 // expira em 1 dia
        });
        return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
})

export default router;