import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/Management.css';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch facilities from API
  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      Swal.fire('Error!', 'Failed to fetch facilities.', 'error');
    }
  };

  useEffect(() => {
    fetchFacilities();
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
          text: 'Do you want to update this facility?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Update facility
            const response = await axios.put(
              `http://localhost:5000/api/facilities/${formData.id}`,
              formData
            );
            if (response.status === 200) {
              Swal.fire('Updated!', 'Facility updated successfully.', 'success');
              setIsEditing(false);
              setFormData({ id: '', name: '', description: '' });
              fetchFacilities(); // Refresh facilities list
            }
          }
        });
      } else {
        // Add new facility
        const response = await axios.post('http://localhost:5000/api/facilities', formData);
        if (response.status === 201) {
          Swal.fire('Added!', 'New facility added successfully.', 'success');
          setFormData({ id: '', name: '', description: '' });
          fetchFacilities(); // Refresh facilities list
        }
      }
    } catch (error) {
      console.error('Error adding/updating facility:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  // Handle edit (Prefill form)
  const handleEdit = (facility) => {
    setFormData({
      id: facility._id, // Use MongoDB ObjectId for updates
      name: facility.name,
      description: facility.description,
    });
    setIsEditing(true);
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this facility? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/facilities/${id}`);
          setFacilities((prevFacilities) =>
            prevFacilities.filter((facility) => facility._id !== id)
          );
          Swal.fire('Deleted!', 'The facility has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting facility:', error);
          Swal.fire('Error!', 'Failed to delete the facility.', 'error');
        }
      }
    });
  };

  return (
    <div className="management-container">
      <h2>Facilities Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Facility Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Facility' : 'Add Facility'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((facility) => (
            <tr key={facility._id}>
              <td>{facility.name}</td>
              <td>{facility.description}</td>
              <td>
                <button onClick={() => handleEdit(facility)}>Edit</button>
                <button onClick={() => handleDelete(facility._id)}>
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

export default Facilities;