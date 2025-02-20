import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/patient/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data.gender,
        contactNumber: data.contactNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
      });
    })
    .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/patient/profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(response => {
      if (response.ok) {
        setEditing(false);
        return response.json();
      } else {
        alert('Error updating profile');
      }
    })
    .then(() => fetchProfile())
    .catch(error => console.error('Error saving profile:', error));
  };

  const fetchProfile = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data.gender,
        contactNumber: data.contactNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
      });
    })
    .catch(error => console.error('Error fetching profile:', error));
  };

  if (!user) return <div className="text-center py-10 text-xl">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {editing ? 'Edit Profile' : 'Profile Details'}
      </h1>

      {editing ? (
        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded-lg"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            className="w-full p-3 border rounded-lg"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            className="w-full p-3 border rounded-lg"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <select
            className="w-full p-3 border rounded-lg"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            className="w-full p-3 border rounded-lg"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
          />
          <input
            className="w-full p-3 border rounded-lg"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            className="w-full p-3 border rounded-lg"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
          <button
            onClick={handleSave}
            className="w-full p-3 bg-black text-white rounded-lg hover:bg-black focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
          <button
            onClick={() => setEditing(true)}
            className="w-full p-3 bg-black text-white rounded-lg hover:bg-black focus:outline-none"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
