import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const JobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    lastDate: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobTitle || !formData.jobDescription || !formData.lastDate || !formData.companyName) {
      setError('Please fill in all fields');
      return;
    }

    // Check if date is in the future
    const selectedDate = new Date(formData.lastDate);
    const today = new Date();
    if (selectedDate <= today) {
      setError('Last date for application must be in the future');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/jobs/add', formData);
      
      if (response.data.success) {
        setSuccess('Job posted successfully!');
        
        // Reset form
        setFormData({
          jobTitle: '',
          jobDescription: '',
          lastDate: '',
          companyName: ''
        });

        // Callback to parent component to refresh job list
        if (onJobAdded) {
          onJobAdded();
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Job creation failed:', error);
      setError(error.response?.data?.error || 'Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. Full Stack Developer"
            required
          />
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Describe the job requirements, responsibilities, and qualifications..."
            required
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. Tech Solutions Inc."
            required
          />
        </div>

        <div>
          <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-2">
            Last Date for Application *
          </label>
          <input
            type="date"
            id="lastDate"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            className="input-field"
            required
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting Job...' : 'Submit Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;