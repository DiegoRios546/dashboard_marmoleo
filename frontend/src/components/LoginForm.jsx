import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
            const { token } = response.data;
            login(token);

            const userRole = JSON.parse(atob(token.split('.')[1])).role;

            // Redirigir al tablero correspondiente según el rol
            if (userRole === 'admin') {
                navigate('/admin/adminDashboard', { replace: true });
            } else if (userRole === 'moderator') {
                navigate('/moderator/moderatorDashboard', { replace: true });
            } else {
                navigate('/user/userDashboard', { replace: true });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error en el inicio de sesión',
                text: error.response?.data.message || 'Usuario o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
