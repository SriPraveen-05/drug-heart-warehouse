"use client"
import React from 'react'
// import RealtimeData from '../../components/Fb'
import dynamic from 'next/dynamic';

// Dynamically import the Station component with no SSR
const RealtimeData= dynamic(() => import('../../components/Fb'), { ssr: false });

const page = () => {
  return (

    <RealtimeData/>
  )
}

export default page