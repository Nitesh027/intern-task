import React from 'react';

const MERNLogo = ({ size = "large", className = "" }) => {
  const sizes = {
    small: { container: "w-12 h-12", text: "text-xs", icon: "w-8 h-8" },
    medium: { container: "w-16 h-16", text: "text-sm", icon: "w-10 h-10" },
    large: { container: "w-20 h-20", text: "text-base", icon: "w-14 h-14" },
    xl: { container: "w-24 h-24", text: "text-lg", icon: "w-16 h-16" }
  };

  const sizeClasses = sizes[size] || sizes.large;

  return (
    <div className={`${sizeClasses.container} ${className} relative group cursor-pointer`}>
     <div className="w-full h-full bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
     <div className="relative z-10 text-center">
          <div className={`${sizeClasses.text} font-black text-white tracking-wider drop-shadow-lg`}>
            MERN
          </div>
          <div className="text-xs text-white/80 font-semibold -mt-1">
            STACK
          </div>
        </div>

   
        <div className="absolute top-1 right-1 w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/20 rounded-full"></div>
      </div>
      
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
    </div>
  );
};

const MERNTextLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <MERNLogo size="medium" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          MERN Portal
        </h1>
        <p className="text-sm text-gray-500 font-medium -mt-1">Job Management System</p>
      </div>
    </div>
  );
};

const TechStackBadges = ({ className = "" }) => {
  const technologies = [
    { name: 'M', full: 'MongoDB', color: 'from-green-500 to-green-600', icon: '🍃' },
    { name: 'E', full: 'Express.js', color: 'from-gray-600 to-gray-700', icon: '⚡' },
    { name: 'R', full: 'React.js', color: 'from-blue-500 to-blue-600', icon: '⚛️' },
    { name: 'N', full: 'Node.js', color: 'from-green-600 to-green-700', icon: '🚀' }
  ];

  return (
    <div className={`flex space-x-2 ${className}`}>
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className={`group relative w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="text-white font-black text-lg">{tech.name}</span>
          <span className="absolute -top-2 -right-1 text-sm">{tech.icon}</span>
          
     
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {tech.full}
          </div>
        </div>
      ))}
    </div>
  );
};

export { MERNLogo, MERNTextLogo, TechStackBadges };
export default MERNLogo;