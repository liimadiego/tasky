import { Router } from 'express';
import { verifyTokenJWT } from '../middlewares/auth.middleware.js';
import taskController from '../controllers/task.controller.js';

const router = Router();

router.post('/', verifyTokenJWT, taskController.createTask);
router.get('/', verifyTokenJWT, taskController.getAllTasks);
router.get('/:id', verifyTokenJWT, taskController.getTaskById);
router.put('/:id', verifyTokenJWT, taskController.updateTask);
router.delete('/:id', verifyTokenJWT, taskController.deleteTask);

export default router;