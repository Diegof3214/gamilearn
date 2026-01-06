import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import RegisterForm from './components/RegisterForm';
import Leaderboard from './components/Leaderboard';
import TopicMenu from './components/TopicMenu';

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/topics" element={<TopicMenu />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
