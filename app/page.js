import HomePage from '@/components/homepage/HomePage'
import { homePageMetadata } from '@/data/metaData';
import React from 'react'
export const metadata = homePageMetadata;
const page = () => {
  return (
    <HomePage/>
  )
}

export default page