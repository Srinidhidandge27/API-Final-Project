import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SymptomDetailsPage() {
  const { id } = useParams();
  const [symptom, setSymptom] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    severity: '',
    duration: '',
    durationUnit: '',
    associatedConditions: [],
  });

  useEffect(() => {
    fetchSymptomDetails();
  }, [id]);

  const fetchSymptomDetails = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/symptoms/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setSymptom(data);
    setForm({
      name: data.name,
      description: data.description,
      severity: data.severity,
      duration: data.duration,
      durationUnit: data.durationUnit,
      associatedConditions: data.associatedConditions,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/symptoms/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setEditing(false);
      fetchSymptomDetails();
    } else {
      alert('Error updating symptom');
    }
  };

  if (!symptom) return <div className="text-center py-10 text-xl">Loading...</div>;

  return (
    <div className="bg-white p-8 shadow-xl rounded-lg max-w-4xl mx-auto mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{editing ? 'Edit Symptom' : symptom.name}</h1>
        {editing ? (
          <div>
            <input
              className="w-full p-3 border rounded-lg mb-4"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Symptom Name"
            />
            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            
            {/* Severity dropdown */}
            <select
              className="w-full p-3 border rounded-lg mb-4"
              name="severity"
              value={form.severity}
              onChange={handleChange}
            >
              <option value="">Severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>

            {/* Duration and Duration Unit on same line */}
            <div className="flex space-x-4 mb-4">
              <input
                className="w-1/2 p-3 border rounded-lg"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (number)"
              />
              <select
                className="w-1/2 p-3 border rounded-lg"
                name="durationUnit"
                value={form.durationUnit}
                onChange={handleChange}
              >
                <option value="">Duration Unit</option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
              </select>
            </div>

            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              name="associatedConditions"
              value={form.associatedConditions.join(', ')}
              onChange={(e) =>
                setForm({
                  ...form,
                  associatedConditions: e.target.value.split(',').map((item) => item.trim()),
                })
              }
              placeholder="Associated Conditions (comma-separated)"
            />
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black focus:outline-none"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xl text-gray-600 mb-6">{symptom.description}</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-semibold text-lg text-gray-700">Severity:</span>
                <span className="text-gray-600">{symptom.severity}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-semibold text-lg text-gray-700">Duration:</span>
                <span className="text-gray-600">{symptom.duration} {symptom.durationUnit}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-semibold text-lg text-gray-700">Associated Conditions:</span>
                <span className="text-gray-600">{symptom.associatedConditions.join(', ')}</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black focus:outline-none"
              >
                Edit Symptom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomDetailsPage;
