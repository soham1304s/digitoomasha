import React from 'react';
import Hero from '../components/Hero';
import LogosBar from '../components/LogosBar';
import VideoShowcase from '../components/VideoShowcase';
import ExecutionRoadmap from '../components/ExecutionRoadmap';
import CaseStudies from '../components/CaseStudies';
import DrivingGrowth from '../components/DrivingGrowth';
import ServicesSection from '../components/ServicesSection';
import TestimonialGrid from '../components/TestimonialGrid';
import ArticlesSection from '../components/ArticlesSection';
import FaqAccordion from '../components/FaqAccordion';
import CtaBanner from '../components/CtaBanner';

export default function HomePage() {
  return (
    <div className="home-page-container">
      <Hero />
      <LogosBar />
      <VideoShowcase />
      <ExecutionRoadmap />
      <CaseStudies />
      <DrivingGrowth />
      <ServicesSection />
      <TestimonialGrid />
      <ArticlesSection />
      <FaqAccordion />
      <CtaBanner />
    </div>
  );
}
