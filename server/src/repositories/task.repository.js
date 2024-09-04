import db from '../config/database.js';

const getAllTasks = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getTaskById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const createTask = async (task) => {
    const { title, description } = task;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: results.insertId, ...task });
                }
            }
        );
    });
};

const updateTask = async (id, task) => {
    const updateFields = [];
    const values = [];

    Object.keys(task).forEach((key) => {
        if (task[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            values.push(task[key]);
        }
    });

    if (updateFields.length === 0) {
        throw new Error('Nenhum campo para atualizar.');
    }

    values.push(id);

    const updateQuery = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(updateQuery, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id, ...task });
            }
        });
    });
};

const deleteTask = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id });
            }
        });
    });
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
