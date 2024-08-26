import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBookOpen } from 'react-icons/fa'; // Example icons for logout and courses

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user details on component mount
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
        navigate('/login'); // Redirect to login if there is an error fetching user
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-2 text-lg">Manage your courses, check progress, and more.</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {!user ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Hello!</h2>
                <p className="text-gray-600">Here’s what’s happening in your account.</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=$&background=random&size=80`}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Your Courses</h3>
                  <p className="text-gray-600">View and manage your enrolled courses.</p>
                </div>
                <button
                  onClick={() => navigate('/courses')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <FaBookOpen />
                  <span>View Courses</span>
                </button>
              </div>

              <div className="bg-red-50 p-6 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Logout</h3>
                  <p className="text-gray-600">Exit your account safely.</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
