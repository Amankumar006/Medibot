import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-8 p-8">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/assets/medibot-logo.png"
            alt="Medibot Logo" 
            className="w-32 h-32 mx-auto"
          />
        </div>

        {/* Tagline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI Health Assistant
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 mb-8">
          Your personal healthcare companion powered by AI
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link 
            to="/signup" 
            className="block w-64 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
          <Link 
            to="/login" 
            className="block w-64 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;