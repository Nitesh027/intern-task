import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [jobStats, setJobStats] = useState({ totalJobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        const jobCountResponse = await axiosInstance.get('/jobs/count');
        if (jobCountResponse.data.success) {
          setJobStats({ totalJobs: jobCountResponse.data.jobCount });
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card max-w-md mx-auto text-center">
        <p className="text-gray-600">No user data found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">MERN Stack Developer</p>
          </div>
        </div>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">{jobStats.totalJobs}</div>
            <div className="text-sm opacity-90">Jobs Posted</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">Active</div>
            <div className="text-sm opacity-90">Account Status</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">2024</div>
            <div className="text-sm opacity-90">Member Since</div>
          </div>
        </div>
      </div>
     <div className="card">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {user.name}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {user.email}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <div className="p-3 bg-gray-50 rounded-md border font-mono text-sm">
              {user._id}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <div className="p-3 bg-gray-50 rounded-md border">
              Job Recruiter - MERN Stack Platform
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Activity Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800">Total Jobs Posted</div>
              <div className="text-sm text-gray-600">All-time job postings</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{jobStats.totalJobs}</div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800">Platform Access</div>
              <div className="text-sm text-gray-600">Dashboard and analytics</div>
            </div>
            <div className="text-lg font-medium text-green-600">Full Access</div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800">Last Login</div>
              <div className="text-sm text-gray-600">Current session</div>
            </div>
            <div className="text-lg font-medium text-gray-600">Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;