import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {
      latitude: -6.890320,
      longitude: 107.610162,
      nama: 'Labtek V',
      status: 'active'
    },
    {
      latitude: -6.890674,
      longitude: 107.610776,
      nama: 'Labtek VI',
      status: 'inactive'
    },
    {
      latitude: -6.890891,
      longitude: 107.610916,
      nama: 'Labtek VII',
      status: 'active'
    },
    {
      latitude: -6.891532,
      longitude: 107.610711,
      nama: 'GKU Barat',
      status: 'inactive'
    },
    {
      // Catatan: Latitude untuk GKU Timur telah diperbaiki dari -107.61 ke nilai yang valid.
      latitude: -6.891630, 
      longitude: 107.611252,
      nama: 'GKU Timur',
      status: 'active'
    },
    {
      latitude: -6.890621,
      longitude: 107.610118,
      nama: 'Perpustakaan Pusat ITB',
      status: 'active'
    },
    {
      latitude: -6.889637,
      longitude: 107.610489,
      nama: 'Fakultas Seni Rupa dan Desain (FSRD)',
      status: 'inactive'
    },
    {
      latitude: -6.891321,
      longitude: 107.609374,
      nama: 'Gedung Serba Guna (Aula Barat)',
      status: 'active'
    },
  ];

  return NextResponse.json(data);
}