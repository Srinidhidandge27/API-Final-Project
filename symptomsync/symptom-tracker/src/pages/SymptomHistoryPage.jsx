import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SymptomHistoryPage() {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/symptoms', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setSymptoms(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Symptom History</h1>
      <p className="text-lg text-gray-600 mb-6">Explore your past symptoms, their details, and track your progress over time.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {symptoms.map(symptom => (
          <div key={symptom._id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800">{symptom.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{symptom.description}</p>
            <p className="text-sm text-gray-500 mt-2">Severity: <span className={`text-${symptom.severity === 'severe' ? 'red' : symptom.severity === 'moderate' ? 'yellow' : 'green'}-600`}>{symptom.severity}</span></p>
            <p className="text-sm text-gray-500 mt-2">Duration: <span className="text-gray-600">{symptom.duration} {symptom.durationUnit}</span></p>
            <div className="mt-4 flex justify-between items-center">
              <Link to={`/symptom/${symptom._id}`} className="text-blue-600 font-medium hover:underline">View Details</Link>
              <span className="text-sm text-gray-400">{new Date(symptom.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SymptomHistoryPage;
