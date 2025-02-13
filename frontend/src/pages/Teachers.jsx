import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../styles/Management.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    subject: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
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
          text: 'Do you want to update this teacher?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await axios.put(
              `http://localhost:5000/api/teachers/${formData.id}`,
              formData
            );
            if (response.status === 200) {
              Swal.fire('Updated!', 'Teacher updated successfully.', 'success');
              setIsEditing(false);
              setFormData({ id: '', name: '', subject: '' });
              fetchTeachers();
            }
          }
        });
      } else {
        const response = await axios.post('http://localhost:5000/api/teachers', formData);
        if (response.status === 201) {
          Swal.fire('Added!', 'New teacher added successfully!', 'success');
          setFormData({ id: '', name: '', subject: '' });
          fetchTeachers();
        }
      }
    } catch (error) {
      console.error('Error adding/updating teacher:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      id: teacher._id,
      name: teacher.name,
      subject: teacher.subject,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this teacher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/teachers/${id}`);
          setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== id));
          Swal.fire('Deleted!', 'The teacher has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting teacher:', error);
          Swal.fire('Error!', 'Failed to delete the teacher.', 'error');
        }
      }
    });
  };

  return (
    <div className="management-container">
      <h2>Teachers Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>
                <button onClick={() => handleEdit(teacher)}>Edit</button>
                <button onClick={() => handleDelete(teacher._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
