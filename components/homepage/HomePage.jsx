"use client"

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedPlanner from '../products/FeaturedPlanner';
import Pathways from './components/Pathways';
import Videos from './components/Videos';
import Resources from './components/Resources';
import Testimonials from '../general/Testimonials';
import CTA from '../general/CTA';
const HomePage = () => {

  return (
    <div className="font-['Merriweather', serif] mt-10 md:mt-0 bg-[#F5E6C8] text-[#4A1A1A] overflow-x-hidden">
        <Hero/>
        <About/>
        <FeaturedPlanner/>
        <Pathways/>
        <Videos/>
        <Resources/>
        <Testimonials/>
        <CTA/>
    </div>
  );
};

export default HomePage;