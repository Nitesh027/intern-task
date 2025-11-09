import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import JobPosted from './JobPosted';
import Profile from './Profile';
import CustomerAnalysis from './CustomerAnalysis';
import { TechStackBadges } from '../components/Logo';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('jobs'); // Default to jobs section

  const renderContent = () => {
    switch (activeSection) {
      case 'jobs':
        return <JobPosted />;
      case 'profile':
        return <Profile />;
      case 'analytics':
        return <CustomerAnalysis />;
      default:
        return <JobPosted />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex animate-fadeIn">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 md:ml-0">
        <header className="bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20 px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="animate-slideIn">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    {activeSection === 'jobs' && '🚀 Job Management'}
                    {activeSection === 'profile' && '👤 User Profile'}
                    {activeSection === 'analytics' && '📊 Customer Analysis'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {activeSection === 'jobs' && 'Manage and monitor your job postings'}
                    {activeSection === 'profile' && 'Update your personal information'}
                    {activeSection === 'analytics' && 'View detailed analytics and insights'}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <TechStackBadges />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <button className="p-2 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 hover-lift">
                  <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z M10.07 2.82l-.9.9a1 1 0 00-.29.71v15.14c0 .28.11.53.29.71l.9.9c.18.18.43.29.71.29h7.46c.28 0 .53-.11.71-.29l.9-.9c.18-.18.29-.43.29-.71V4.43c0-.28-.11-.53-.29-.71l-.9-.9a1 1 0 00-.71-.29H10.78a1 1 0 00-.71.29z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">
                  Welcome back, {JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}!
                </div>
                <div className="text-xs text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover-lift cursor-pointer">
                  <span className="text-lg font-bold text-white">
                    {JSON.parse(localStorage.getItem('user') || '{}').name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>
        
        
        <main className="p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 hover-lift">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;