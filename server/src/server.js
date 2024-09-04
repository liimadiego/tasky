import dotenv from 'dotenv-safe';
import app from './app.js';

dotenv.config({
    allowEmptyValues: true
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});