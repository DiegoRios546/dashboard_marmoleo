import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ModeratorDashboard from './pages/moderator/ModeratorDashboard';
import UserDashboard from './pages/user/UserDashboard';
import RoleProtectedRoute from './components/RoleProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/admin/adminDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path="/moderator/moderatorDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['moderator']}>
                                <ModeratorDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/userDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['user']}>
                                <UserDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
