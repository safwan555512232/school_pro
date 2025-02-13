import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../styles/AdminProfile.css';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to fetch profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Swal Confirmation Dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(
            'http://localhost:5000/api/user/profile',
            profile,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // Success Message
          Swal.fire('Updated!', 'Your profile has been updated.', 'success');
          setProfile(response.data);
        } catch (error) {
          setError('Failed to update profile');
          console.error(error);
          // Error Message
          Swal.fire('Error!', 'Failed to update profile.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default AdminProfile;