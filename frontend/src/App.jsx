import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Staff from './pages/Staff';
import Facilities from './pages/Facilities';
import Classrooms from './pages/Classrooms';
import Home from './pages/Home';
import AdminProfile from './pages/AdminProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="staff" element={<Staff />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="classrooms" element={<Classrooms />} />
          <Route path="adminprofile" element={<AdminProfile />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;