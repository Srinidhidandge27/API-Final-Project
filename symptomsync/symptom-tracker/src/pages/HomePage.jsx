import React from 'react';

function HomePage() {
  return (
    <div className="text-gray-800">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Welcome to the Symptom Tracker</h1>
      <p className="text-xl text-gray-700 mb-8">Monitor your health, track symptoms, and gain insights into your well-being.</p>
      <p className="text-lg text-gray-600 max-w-2xl">
        This app allows you to log your symptoms, track their severity and duration, and get detailed information about them over time.
      </p>
    </div>
  );
}

export default HomePage;
