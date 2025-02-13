import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/Management.css';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch staff members from API
  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      Swal.fire('Error!', 'Failed to fetch staff members.', 'error');
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Confirm before updating
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update this staff member?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Update staff member
            const response = await axios.put(
              `http://localhost:5000/api/staff/${formData.id}`,
              formData
            );
            if (response.status === 200) {
              Swal.fire('Updated!', 'Staff member updated successfully.', 'success');
              setIsEditing(false);
              setFormData({ id: '', name: '', role: '' });
              fetchStaff(); // Refresh staff list
            }
          }
        });
      } else {
        // Add new staff member
        const response = await axios.post('http://localhost:5000/api/staff', formData);
        if (response.status === 201) {
          Swal.fire('Added!', 'New staff member added successfully.', 'success');
          setFormData({ id: '', name: '', role: '' });
          fetchStaff(); // Refresh staff list
        }
      }
    } catch (error) {
      console.error('Error adding/updating staff:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  // Handle edit (Prefill form)
  const handleEdit = (member) => {
    setFormData({
      id: member._id, // Use MongoDB ObjectId for updates
      name: member.name,
      role: member.role,
    });
    setIsEditing(true);
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this staff member? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/staff/${id}`);
          setStaff((prevStaff) => prevStaff.filter((member) => member._id !== id));
          Swal.fire('Deleted!', 'The staff member has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting staff:', error);
          Swal.fire('Error!', 'Failed to delete the staff member.', 'error');
        }
      }
    });
  };

  return (
    <div className="management-container">
      <h2>Staff Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Staff Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member._id)}>
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

export default Staff;