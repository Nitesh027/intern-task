import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import JobForm from '../components/JobForm';

const JobPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/jobs/');
      
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobAdded = () => {
    fetchJobs(); 
  };

  const handleEditJob = (job) => {
    setEditingJob(job._id);
    setEditFormData({
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      lastDate: job.lastDate.split('T')[0], 
      companyName: job.companyName
    });
  };

  const handleUpdateJob = async (jobId) => {
    try {
      const response = await axiosInstance.put(`/jobs/${jobId}`, editFormData);
      
      if (response.data.success) {
        setEditingJob(null);
        fetchJobs(); 
      }
    } catch (error) {
      console.error('Update failed:', error);
      setError('Failed to update job. Please try again.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axiosInstance.delete(`/jobs/${jobId}`);
        fetchJobs(); 
      } catch (error) {
        console.error('Delete failed:', error);
        setError('Failed to delete job. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <JobForm onJobAdded={handleJobAdded} />
      <div className="card">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Posted Jobs ({jobs.length})</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-lg">No jobs posted yet</p>
            <p className="text-sm">Create your first job posting using the form above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                {editingJob === job._id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editFormData.jobTitle}
                      onChange={(e) => setEditFormData({...editFormData, jobTitle: e.target.value})}
                      className="input-field font-semibold text-lg"
                    />
                    <textarea
                      value={editFormData.jobDescription}
                      onChange={(e) => setEditFormData({...editFormData, jobDescription: e.target.value})}
                      rows={3}
                      className="input-field resize-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editFormData.companyName}
                        onChange={(e) => setEditFormData({...editFormData, companyName: e.target.value})}
                        className="input-field"
                        placeholder="Company Name"
                      />
                      <input
                        type="date"
                        value={editFormData.lastDate}
                        onChange={(e) => setEditFormData({...editFormData, lastDate: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateJob(job._id)}
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingJob(null)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.jobDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Company:</span>
                        <p className="text-gray-600">{job.companyName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Application Deadline:</span>
                        <p className="text-gray-600">{formatDate(job.lastDate)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Posted:</span>
                        <p className="text-gray-600">{formatDate(job.created_at)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPosted;