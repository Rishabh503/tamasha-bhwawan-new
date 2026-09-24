import HomePage from '../components/homepage/HomePage';
import React from 'react';
import { homePageMetadata } from '../data/metaData';

export const metadata = homePageMetadata;

const page = () => {
  return <HomePage />;
};

export default page;