import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaBuilding, FaDoorOpen, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>School Management</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/home" className={isActive('/dashboard/home') ? 'active' : ''}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/students" className={isActive('/dashboard/students') ? 'active' : ''}>
                <FaUserGraduate /> Students
              </Link>
            </li>
            <li>
              <Link to="/dashboard/teachers" className={isActive('/dashboard/teachers') ? 'active' : ''}>
                <FaChalkboardTeacher /> Teachers
              </Link>
            </li>
            <li>
              <Link to="/dashboard/staff" className={isActive('/dashboard/staff') ? 'active' : ''}>
                <FaUsers /> Staff
              </Link>
            </li>
            <li>
              <Link to="/dashboard/facilities" className={isActive('/dashboard/facilities') ? 'active' : ''}>
                <FaBuilding /> Facilities
              </Link>
            </li>
            <li>
              <Link to="/dashboard/classrooms" className={isActive('/dashboard/classrooms') ? 'active' : ''}>
                <FaDoorOpen /> Classrooms
              </Link>
            </li>
            <li>
              <Link to="/dashboard/adminprofile" className={isActive('/dashboard/adminprofile') ? 'active' : ''}>
                <FaUser /> Profile
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;