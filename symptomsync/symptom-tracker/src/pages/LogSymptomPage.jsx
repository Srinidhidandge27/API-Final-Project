import React, { useState } from 'react';

function LogSymptomPage() {
  const [form, setForm] = useState({
    name: '', description: '', severity: '', duration: '', durationUnit: '', associatedConditions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Add token here
      },
      body: JSON.stringify({ ...form, associatedConditions: form.associatedConditions.split(',').map(item => item.trim()) }),
    });

    if (response.ok) setForm({ name: '', description: '', severity: '', duration: '', durationUnit: '', associatedConditions: '' });
    else alert('Error adding symptom');
  };

  return (
    <div className="max-w-3xl bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Log a New Symptom</h1>
      <p className="text-lg text-gray-600 mb-6">Track and manage your health more effectively by logging your symptoms below.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded-lg" type="text" name="name" placeholder="Symptom Name" value={form.name} onChange={handleChange} required />
        <textarea className="w-full p-3 border rounded-lg" name="description" placeholder="Symptom Description" value={form.description} onChange={handleChange} required />
        
        {/* Severity dropdown */}
        <select
          className="w-full p-3 border rounded-lg"
          name="severity"
          value={form.severity}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>

        {/* Duration and Duration Unit on same line */}
        <div className="flex space-x-4">
          <input
            className="w-1/2 p-3 border rounded-lg"
            type="number"
            name="duration"
            placeholder="Duration (number)"
            value={form.duration}
            onChange={handleChange}
            required
          />
          <select
            className="w-1/2 p-3 border rounded-lg"
            name="durationUnit"
            value={form.durationUnit}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Duration Unit</option>
            <option value="Hours">Hours</option>
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
          </select>
        </div>

        <input className="w-full p-3 border rounded-lg" type="text" name="associatedConditions" placeholder="Associated Conditions (comma-separated)" value={form.associatedConditions} onChange={handleChange} />
        
        <button
          type="submit"
          className="w-full text-white p-3 rounded-lg bg-black hover:bg-black focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogSymptomPage;
