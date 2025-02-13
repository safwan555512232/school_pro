import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../styles/Management.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    grade: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); // Runs once when the component mounts

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Confirm before updating
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update this student\'s details?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // UPDATE API CALL
            const response = await axios.put(
              `http://localhost:5000/api/students/${formData.id}`,
              formData
            );
  
            if (response.status === 200) {
              Swal.fire('Updated!', 'Student updated successfully.', 'success');
              setIsEditing(false);
              setFormData({ id: '', name: '', grade: '' });
              fetchStudents(); // Refresh student list
            }
          }
        });
      } else {
        // ADD API CALL
        const response = await axios.post('http://localhost:5000/api/students', formData);
        if (response.status === 201) {
          Swal.fire('Added!', 'New Student added successfully!', 'success');
          setFormData({ id: '', name: '', grade: '' });
          fetchStudents(); // Refresh student list
        }
      }
    } catch (error) {
      console.error('Error adding/updating student:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };
  

  // Handle edit (Prefill form)
  const handleEdit = (student) => {
    setFormData({
      id: student._id, // Store MongoDB ObjectId for updates
      name: student.name,
      grade: student.grade,
    });
    setIsEditing(true);
  };

  // Delete a student with confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this student? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/students/${id}`);
          setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
          Swal.fire('Deleted!', 'The student has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire('Error!', 'Failed to delete the student.', 'error');
        }
      }
    });
  };

  return (
    <div className="management-container">
      <h2>Students Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id || student.id}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id || student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
