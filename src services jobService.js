import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Set auth token if available
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get all jobs with filters
export const searchJobs = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    for (const key in filters) {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params.append(key, filters[key]);
      }
    }
    
    const response = await axios.get(`${API_URL}/jobs?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get jobs within radius
export const getJobsInRadius = async (zipcode, distance) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/radius/${zipcode}/${distance}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get single job
export const getJob = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create job (for employers)
export const createJob = async (jobData, token) => {
  try {
    setAuthToken(token);
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Apply for job
export const applyForJob = async (jobId, formData, token) => {
  try {
    setAuthToken(token);
    const response = await axios.post(`${API_URL}/jobs/${jobId}/applications`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};