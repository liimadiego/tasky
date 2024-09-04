import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    IconButton
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import ResponsiveAppBar from '../Header';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskForm, setTaskForm] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/tasks`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(response.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDialogOpen = (type, task = null) => {
        setDialogType(type);
        setSelectedTask(task);
        setTaskForm({
            title: task ? task.title : '',
            description: task ? task.description : '',
        });
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTaskForm({
            ...taskForm,
            [name]: value,
        });
    };

    const handleAddTask = async () => {
        try {
            await axios.post(`${apiBaseUrl}/tasks`, taskForm, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            fetchTasks();
            handleDialogClose();
            Swal.fire({
                icon: "success",
                title: "Tarefa criada com sucesso",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            handleDialogClose();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    const handleUpdateTask = async () => {
        try {
            await axios.put(`${apiBaseUrl}/tasks/${selectedTask.id}`, taskForm, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            fetchTasks();
            handleDialogClose();
            Swal.fire({
                icon: "success",
                title: "Os dados foram atualizados",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            handleDialogClose();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    const handleDeleteTask = async (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Essa ação não é reversível.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                    setTasks(tasks.filter((task) => task.id !== id));
                    Swal.fire('Tarefa deletada!', 'Sua tarefa foi deletada.', 'success');
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <ResponsiveAppBar />
            <Box display="flex" justifyContent="center" style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/background2.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <Box width={{ xs: '90%', md: '50%' }}>
                    <Container>
                        <Box display="flex" style={{ flexDirection: "column", textAlign: "center" }}>
                            <Typography style={{ marginTop: "20px" }} variant="h5" gutterBottom>
                                Lista de Tarefas
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handleDialogOpen('add')}>
                                Adicionar Tarefa
                            </Button>
                        </Box>
                        <List>
                            {tasks.map(task => (
                                <ListItem key={task.id}>
                                    <ListItemText primary={task.title} secondary={task.description} />
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        onClick={() => handleDialogOpen('edit', task)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </IconButton >
                                    <IconButton
                                        size='small'
                                        color="error"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton >
                                </ListItem>
                            ))}
                        </List>

                        <Dialog open={openDialog} onClose={handleDialogClose}>
                            <DialogTitle>{dialogType === 'add' ? 'Adicionar Tarefa' : 'Editar Tarefa'}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="title"
                                    label="Título"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={taskForm.title}
                                    onChange={handleFormChange}
                                />
                                <TextField
                                    margin="dense"
                                    name="description"
                                    label="Descrição"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={taskForm.description}
                                    onChange={handleFormChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={dialogType === 'add' ? handleAddTask : handleUpdateTask}
                                    color="primary"
                                >
                                    {dialogType === 'add' ? 'Adicionar' : 'Atualizar'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default TaskList;
