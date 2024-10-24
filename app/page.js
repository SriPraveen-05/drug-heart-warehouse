"use client"
// import MapComponent from "./map";
import dynamic from 'next/dynamic';

// Dynamically import the Station component with no SSR
const MapComponent= dynamic(() => import('./map'), { ssr: false });
export default function Home() {
  return (
    <MapComponent/>
  );
}
