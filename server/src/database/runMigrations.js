import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsPath = path.join(__dirname, 'migrations');

const runScript = (file) => {
    return execPromise(`node ${file}`);
};

const runAllMigrations = async () => {
    try {
        const files = fs.readdirSync(scriptsPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const filePath = path.join(scriptsPath, file);
            console.log(`Executando ${filePath}...`);
            const { stdout, stderr } = await runScript(filePath);
            if (stderr) {
                console.error(`Erro: ${stderr}`);
            }
            console.log(stdout);
        }

        console.log('Todas as migrations foram executadas.');
    } catch (err) {
        console.error('Erro ao executar migrations:', err);
    }
};

runAllMigrations();
