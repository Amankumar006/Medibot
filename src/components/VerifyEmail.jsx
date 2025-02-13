import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendVerification = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup'
      });

      if (error) throw error;

      setMessage('Verification email has been resent!');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Verify your email
        </h2>

        <p className="text-gray-600 mb-8">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>

        <div className="space-y-4">
          {message && (
            <p className={`text-sm ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or
          </p>
          <button
            className="text-blue-600 hover:underline font-medium disabled:opacity-50"
            onClick={handleResendVerification}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Click here to resend'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 