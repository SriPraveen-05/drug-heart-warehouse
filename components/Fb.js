'use client';  // Ensures this is a client-side component in Next.js

import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../app/libs/firebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardBody } from '@nextui-org/react';

const RealtimeData = () => {
  const [location, setLocation] = useState({ latitude: 12.83959, longitude: 80.15488 });
  const [sensor, setSensor] = useState({ humidity: 76.1, temperature: 26.5 });
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    // This will ensure the code runs only on the client
    if (typeof window !== 'undefined') {
      // Reference to the 'location' and 'sensor' node in the Firebase database
      const locationRef = ref(database, 'location');
      const sensorRef = ref(database, 'sensor');

      // Fetch 'location' data from Firebase
      onValue(locationRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setLocation(data);
      });

      // Fetch 'sensor' data from Firebase
      onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setSensor(data);
      });
    }
  }, []);

  const handleMarkerClick = () => {
    setSelectedData({ ...location, ...sensor });
  };

  return (
    <div>
      <h1>Realtime Data from Firebase</h1>
      {/* Map using Leaflet */}
      <Card className='flex justify-center align-middle m-[5vw]'>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        className='z-0'
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[location.latitude, location.longitude]}
          icon={L.icon({ iconUrl: '/truck.gif', iconSize: [60, 60], iconAnchor: [30, 60], popupAnchor: [0, -50] })}
          eventHandlers={{ click: handleMarkerClick }}
        >
          <Popup>
            <div>
              <p><strong>Humidity:</strong> {sensor.humidity}%</p>
              <p><strong>Temperature:</strong> {sensor.temperature}°C</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      </Card>
      
      {/* Display the selected data */}
      {selectedData && (
        <div className="shadow-lg bg-white p-6 rounded-lg border border-gray-200 mt-6">
          <h1 className="text-xl font-semibold mb-4">Selected Data</h1>
          <div className="space-y-2">
            <p><strong>Latitude:</strong> {selectedData.latitude}</p>
            <p><strong>Longitude:</strong> {selectedData.longitude}</p>
            <p><strong>Humidity:</strong> {selectedData.humidity}%</p>
            <p><strong>Temperature:</strong> {selectedData.temperature}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeData;
