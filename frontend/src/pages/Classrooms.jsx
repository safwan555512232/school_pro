import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../styles/Management.css';

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    capacity: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch classrooms from API
  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update this classroom?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await axios.put(
              `http://localhost:5000/api/classrooms/${formData.id}`,
              formData
            );
            if (response.status === 200) {
              Swal.fire('Updated!', 'Classroom updated successfully.', 'success');
              setIsEditing(false);
              setFormData({ id: '', name: '', capacity: '' });
              fetchClassrooms();
            }
          }
        });
      } else {
        const response = await axios.post('http://localhost:5000/api/classrooms', formData);
        if (response.status === 201) {
          Swal.fire('Added!', 'New Classroom added successfully!', 'success');
          setFormData({ id: '', name: '', capacity: '' });
          fetchClassrooms();
        }
      }
    } catch (error) {
      console.error('Error adding/updating classroom:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  // Handle edit
  const handleEdit = (classroom) => {
    setFormData({
      id: classroom._id,
      name: classroom.name,
      capacity: classroom.capacity,
    });
    setIsEditing(true);
  };

  // Delete a classroom with confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this classroom? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/classrooms/${id}`);
          setClassrooms((prevClassrooms) => prevClassrooms.filter((classroom) => classroom._id !== id));
          Swal.fire('Deleted!', 'The classroom has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting classroom:', error);
          Swal.fire('Error!', 'Failed to delete the classroom.', 'error');
        }
      }
    });
  };

  return (
    <div className="management-container">
      <h2>Classrooms Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Classroom Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Classroom' : 'Add Classroom'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom._id || classroom.id}>
              <td>{classroom.name}</td>
              <td>{classroom.capacity}</td>
              <td>
                <button onClick={() => handleEdit(classroom)}>Edit</button>
                <button onClick={() => handleDelete(classroom._id || classroom.id)}>
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

export default Classrooms;
