import mysql from 'mysql2';
import dotenv from 'dotenv-safe';

dotenv.config({
    allowEmptyValues: true
});

const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
};

const createDatabase = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);

        connection.query('CREATE DATABASE IF NOT EXISTS tasks', (err, results) => {
            if (err) return reject(err);
            console.log('Banco de dados criado ou já existe.');
            connection.end();
            resolve(results);
        });
    });
};

const createTable = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            ...connectionConfig,
            database: 'tasks'
        });

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;

        connection.query(createTableQuery, (err, results) => {
            if (err) return reject(err);
            console.log('Tabela criada ou já existe.');
            connection.end();
            resolve(results);
        });
    });
};

const setupDatabase = async () => {
    try {
        await createDatabase();
        await createTable();
    } catch (err) {
        console.error('Erro ao configurar o banco de dados:', err);
    }
};

setupDatabase();
