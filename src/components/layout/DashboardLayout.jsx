import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Chat Assistant', icon: '💬' },
    { path: '/dashboard/appointments', label: 'Appointments', icon: '📅' },
    { path: '/dashboard/health-records', label: 'Health Records', icon: '📋' },
    { path: '/dashboard/medications', label: 'Medications', icon: '💊' },
    { path: '/dashboard/find-doctors', label: 'Find Doctors', icon: '👨‍⚕️' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src="../src/assets/logo.png" alt="Medibot" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Medibot</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-xl">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 