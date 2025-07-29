import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationSearch from './LocationSearch';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const JobMap = ({ jobs }) => {
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [zoom, setZoom] = useState(2);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    setFilteredJobs(jobs.filter(job => job.location && job.location.coordinates));
  }, [jobs]);

  const handleLocationSelect = (location) => {
    setMapCenter([location.lat, location.lng]);
    setZoom(10);
  };

  return (
    <div className="job-map" style={{ height: '600px', width: '100%' }}>
      <LocationSearch onSelect={handleLocationSelect} />
      
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredJobs.map((job) => (
          <Marker
            key={job._id}
            position={[
              job.location.coordinates[1],
              job.location.coordinates[0]
            ]}
          >
            <Popup>
              <div>
                <h6>{job.title}</h6>
                <p>{job.company?.name}</p>
                <p>{job.location.formattedAddress}</p>
                <a href={`/jobs/${job._id}`}>View Job</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default JobMap;