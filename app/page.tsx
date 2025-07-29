'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Load MapView tanpa server-side rendering (karena Leaflet butuh DOM)
const MapView = dynamic(() => import('../components/MapView'), {
  ssr: false,
});

export default function HomePage() {
  return <MapView />;
}
