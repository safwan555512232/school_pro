import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    staff: 0,
    classrooms: 0,
    facilities: 0,
  });

  useEffect(() => {
    // Fetch counts from the backend API
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/home/counts'); // Replace with your API endpoint
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our School</h1>
        <p>Providing quality education since 1990</p>
      </header>

      <section className="school-info">
        <h2>About Our School</h2>
        <p>
          Our school is dedicated to fostering a nurturing environment where students can thrive academically, socially, and emotionally. We offer a wide range of programs and facilities to support the holistic development of our students.
        </p>
      </section>

      <section className="quick-links">
        <h2>Management Overview</h2>
        <div className="links-grid">
          <Link to="/dashboard/students" className="link-card">
            <h3>Students</h3>
            <p>Total Students: <span className="count">{counts.students}</span></p>
          </Link>
          <Link to="/dashboard/teachers" className="link-card">
            <h3>Teachers</h3>
            <p>Total Teachers: <span className="count">{counts.teachers}</span></p>
          </Link>
          <Link to="/dashboard/staff" className="link-card">
            <h3>Staff</h3>
            <p>Total Staff: <span className="count">{counts.staff}</span></p>
          </Link>
          <Link to="/dashboard/classrooms" className="link-card">
            <h3>Classrooms</h3>
            <p>Total Classrooms: <span className="count">{counts.classrooms}</span></p>
          </Link>
          <Link to="/dashboard/facilities" className="link-card">
            <h3>Facilities</h3>
            <p>Total Facilities: <span className="count">{counts.facilities}</span></p>
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Our School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;