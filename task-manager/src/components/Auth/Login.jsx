// LoginPage.jsx
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(process.env.REACT_APP_API_BASE_URL);

            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { user: email, password });
            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                navigate('/tasks');
            }
        } catch (error) {
            console.error('Falha no login:', error);
        }
    };

    return (
        <Box style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${process.env.PUBLIC_URL}/background1.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;