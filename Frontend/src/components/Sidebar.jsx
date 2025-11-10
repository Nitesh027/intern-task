import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MERNLogo from './Logo';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'jobs', label: 'Job Posted', icon: '📋' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'analytics', label: 'Customer Analysis', icon: '📊' }
  ];

  return (
    <>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-lg text-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

    
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white
        backdrop-blur-xl shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
         <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <MERNLogo size="large" className="animate-fadeIn" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Job Portal
            </h2>
            <p className="text-xs text-gray-400 mt-1">MERN Stack Platform</p>
          </div>
          
          
          <nav className="space-y-3">
            {sidebarItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-4 rounded-2xl transition-all duration-300
                  flex items-center space-x-4 group
                  ${activeSection === item.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white hover:transform hover:scale-105'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center text-lg
                  ${activeSection === item.id 
                    ? 'bg-white/20' 
                    : 'bg-white/5 group-hover:bg-white/10'
                  }
                `}>
                  {item.icon}
                </div>
                <span className="font-semibold">{item.label}</span>
                {activeSection === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
            
         
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 flex items-center space-x-4 text-gray-300 hover:bg-red-600/20 hover:text-red-400 group border border-red-500/20 hover:border-red-500/50"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center text-lg">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>

      
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-700/50 bg-gradient-to-t from-gray-900/50 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {JSON.parse(localStorage.getItem('user') || '{}').name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}
              </div>
              <div className="text-xs text-gray-400">Online</div>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;