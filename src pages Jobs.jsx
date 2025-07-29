import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import JobMap from '../components/location/JobMap';
import Spinner from '../components/ui/Spinner';
import Pagination from '../components/ui/Pagination';
import { JobContext } from '../context/JobContext';
import { AuthContext } from '../context/AuthContext';
import { searchJobs } from '../services/jobService';

const Jobs = () => {
  const { jobs, loading, error, getJobs } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState({
    title: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    visaSponsorship: false,
    isRemote: false,
    page: 1,
    limit: 10
  });
  const [showMap, setShowMap] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query params from URL
    const queryParams = new URLSearchParams(location.search);
    const params = {
      title: queryParams.get('title') || '',
      location: queryParams.get('location') || '',
      jobType: queryParams.get('jobType') || '',
      experienceLevel: queryParams.get('experienceLevel') || '',
      visaSponsorship: queryParams.get('visaSponsorship') === 'true',
      isRemote: queryParams.get('isRemote') === 'true',
      page: parseInt(queryParams.get('page')) || 1,
      limit: parseInt(queryParams.get('limit')) || 10
    };
    setSearchParams(params);
    fetchJobs(params);
  }, [location.search]);

  const fetchJobs = async (params) => {
    try {
      const { jobs, total } = await searchJobs(params);
      getJobs(jobs);
      setTotalJobs(total);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleSearch = (newParams) => {
    const params = { ...searchParams, ...newParams, page: 1 };
    updateURL(params);
  };

  const handlePageChange = (page) => {
    const params = { ...searchParams, page };
    updateURL(params);
  };

  const updateURL = (params) => {
    const queryParams = new URLSearchParams();
    for (const key in params) {
      if (params[key]) {
        queryParams.set(key, params[key]);
      }
    }
    navigate({ search: queryParams.toString() });
  };

  const toggleMapView = () => {
    setShowMap(!showMap);
  };

  if (loading) return <Spinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="jobs-page">
      <div className="row">
        <div className="col-md-3">
          <JobFilters 
            filters={searchParams} 
            onFilterChange={handleSearch} 
          />
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between mb-4">
            <h2>International Job Listings</h2>
            <button 
              className="btn btn-outline-primary"
              onClick={toggleMapView}
            >
              {showMap ? 'List View' : 'Map View'}
            </button>
          </div>

          {showMap ? (
            <JobMap jobs={jobs} />
          ) : (
            <>
              <JobList jobs={jobs} user={user} />
              <Pagination
                currentPage={searchParams.page}
                totalItems={totalJobs}
                itemsPerPage={searchParams.limit}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;