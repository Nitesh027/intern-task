import React from 'react';
import { Link } from 'react-router-dom';
import { MERNTextLogo, TechStackBadges, MERNLogo } from '../components/Logo';
import Footer from '../components/Footer';

const LandingPage = () => {
  const features = [
    {
      title: "Modern Job Management",
      description: "Streamlined job posting and candidate management system",
      icon: "💼",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Real-time Analytics",
      description: "Track your job performance with detailed analytics",
      icon: "📊",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Secure Authentication",
      description: "JWT-based secure login and user management",
      icon: "🔐",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Responsive Design",
      description: "Beautiful UI that works on all devices",
      icon: "📱",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const technologies = [
    {
      name: "MongoDB",
      description: "NoSQL database for flexible data storage",
      icon: "🍃",
      color: "text-green-600"
    },
    {
      name: "Express.js",
      description: "Fast, unopinionated web framework for Node.js",
      icon: "⚡",
      color: "text-yellow-600"
    },
    {
      name: "React.js",
      description: "A JavaScript library for building user interfaces",
      icon: "⚛️",
      color: "text-blue-600"
    },
    {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine",
      icon: "🚀",
      color: "text-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <MERNTextLogo />
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <MERNLogo size="xl" className="mx-auto mb-8" />
          </div>
          
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            MERN Job Portal
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern, full-stack job management platform built with MongoDB, Express.js, React.js, and Node.js. 
            Experience the power of the MERN stack in action.
          </p>

          <div className="flex justify-center mb-12">
            <TechStackBadges />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Built with the MERN Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-4xl mb-4 ${tech.color}`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{tech.name}</h3>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the MERN Stack?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our platform for their job management needs.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;