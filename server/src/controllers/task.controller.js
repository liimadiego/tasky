import taskRepository from '../repositories/task.repository.js';

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskRepository.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter tarefas', error: err });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskRepository.getTaskById(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter tarefa', error: err });
    }
};

const createTask = async (req, res) => {
    const task = req.body;
    try {
        const newTask = await taskRepository.createTask(task);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error: err });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    try {
        const updatedTask = await taskRepository.updateTask(id, task);
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error: err });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await taskRepository.deleteTask(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error: err });
    }
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
