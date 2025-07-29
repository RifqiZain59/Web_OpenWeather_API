'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Tipe data untuk lokasi
type Location = {
  latitude: number;
  longitude: number;
  nama: string;
  deskripsi: string;
  status: 'active' | 'inactive';
};

// Custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [filter, setFilter] = useState<'semua' | 'active' | 'inactive'>('semua');

  // Ambil data lokasi dari API
  useEffect(() => {
    axios.get('/api/locations')
      .then(res => {
        console.log('Data dari API:', res.data); // Debugging
        setLocations(res.data);
        setFilteredLocations(res.data); // Awalnya tampil semua
      })
      .catch(err => console.error('Gagal memuat data lokasi:', err));
  }, []);

  // Filter berdasarkan status
  useEffect(() => {
    if (filter === 'semua') {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(locations.filter(loc => loc.status === filter));
    }
  }, [filter, locations]);

  return (
    <div style={containerStyle}>
      <div style={headerCardStyle}>
        <h2 style={titleStyle}>🗺️ <b>Map View - Bangunan ITB</b></h2>

        <div style={filterButtonContainer}>
          <button style={buttonStyle(filter === 'semua')} onClick={() => setFilter('semua')}>Semua</button>
          <button style={buttonStyle(filter === 'active')} onClick={() => setFilter('active')}>Aktif</button>
          <button style={buttonStyle(filter === 'inactive')} onClick={() => setFilter('inactive')}>Tidak Aktif</button>
        </div>
      </div>

      <div style={mapContainerStyle}>
        <MapContainer center={[-6.8915, 107.6107]} zoom={17} style={{ height: "600px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map((loc, idx) => (
            <Marker
              key={idx}
              position={[loc.latitude, loc.longitude]}
              icon={customIcon}
            >
              <Popup>
                <b>{loc.nama}</b><br />
                {loc.deskripsi}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

// Gaya CSS
const containerStyle: React.CSSProperties = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headerCardStyle: React.CSSProperties = {
  background: '#f8f9fa',
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '16px',
  color: '#343a40',
};

const filterButtonContainer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const mapContainerStyle: React.CSSProperties = {
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
};

const buttonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '10px 18px',
  borderRadius: '8px',
  border: '1px solid #007bff',
  backgroundColor: isActive ? '#007bff' : '#ffffff',
  color: isActive ? '#ffffff' : '#007bff',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.3s ease',
});
