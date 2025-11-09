import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import axiosInstance from '../api/axiosInstance';

const CustomerAnalysis = () => {
  const [realJobCount, setRealJobCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Dummy data for charts
  const monthlyApplicationsData = [
    { month: 'Jan', applications: 45, interviews: 12 },
    { month: 'Feb', applications: 52, interviews: 18 },
    { month: 'Mar', applications: 38, interviews: 15 },
    { month: 'Apr', applications: 68, interviews: 22 },
    { month: 'May', applications: 75, interviews: 28 },
    { month: 'Jun', applications: 62, interviews: 20 },
  ];

  const jobCategoryData = [
    { name: 'Full Stack', value: 35, color: '#8884d8' },
    { name: 'Frontend', value: 25, color: '#82ca9d' },
    { name: 'Backend', value: 20, color: '#ffc658' },
    { name: 'DevOps', value: 12, color: '#ff7300' },
    { name: 'Mobile', value: 8, color: '#00ff00' }
  ];

  const performanceData = [
    { metric: 'Response Rate', value: 78, target: 85 },
    { metric: 'Interview Rate', value: 32, target: 40 },
    { metric: 'Hire Rate', value: 15, target: 20 },
    { metric: 'Time to Fill', value: 68, target: 60 }
  ];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Get real job count from API
        const jobCountResponse = await axiosInstance.get('/jobs/count');
        if (jobCountResponse.data.success) {
          setRealJobCount(jobCountResponse.data.jobCount);
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Analysis Dashboard</h2>
        <p className="text-gray-600">Comprehensive analytics and insights for job postings and applications</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">{realJobCount}</div>
            <div className="text-sm opacity-90">Total Jobs Posted</div>
            <div className="text-xs opacity-75 mt-1">(Real Data)</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">347</div>
            <div className="text-sm opacity-90">Total Applications</div>
            <div className="text-xs opacity-75 mt-1">(Dummy Data)</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">89</div>
            <div className="text-sm opacity-90">Interviews Scheduled</div>
            <div className="text-xs opacity-75 mt-1">(Dummy Data)</div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">23</div>
            <div className="text-sm opacity-90">Positions Filled</div>
            <div className="text-xs opacity-75 mt-1">(Dummy Data)</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Applications */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Applications & Interviews</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyApplicationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#8884d8" name="Applications" />
              <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Categories */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Job Categories Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-semibold text-gray-700">{metric.metric}</div>
              <div className="mt-2">
                <div className="text-3xl font-bold text-blue-600">{metric.value}%</div>
                <div className="text-sm text-gray-500">Target: {metric.target}%</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${metric.value >= metric.target ? 'bg-green-500' : 'bg-orange-500'}`}
                  style={{ width: `${(metric.value / 100) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Application Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyApplicationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#8884d8" 
              strokeWidth={3}
              name="Applications"
            />
            <Line 
              type="monotone" 
              dataKey="interviews" 
              stroke="#82ca9d" 
              strokeWidth={3}
              name="Interviews"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-blue-600 font-semibold">Most Popular Role</div>
            <div className="text-lg font-bold">Full Stack Developer</div>
            <div className="text-sm text-gray-600">35% of all job posts</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-green-600 font-semibold">Best Performance Month</div>
            <div className="text-lg font-bold">May 2024</div>
            <div className="text-sm text-gray-600">75 applications received</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-purple-600 font-semibold">Average Response Time</div>
            <div className="text-lg font-bold">2.3 days</div>
            <div className="text-sm text-gray-600">Industry standard: 3-5 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysis;