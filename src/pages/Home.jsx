import React from 'react';

// Import Sections
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Features from '../components/Features';
import CaseStudies from '../components/CaseStudies';
import Comparison from '../components/Comparison';
import Philosophy from '../components/Philosophy';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Problem />
            <Solution />
            <Features />
            <CaseStudies />
            <Comparison />
            <Philosophy />
            <FAQ />
            <FinalCTA />
        </>
    );
};

export default Home;
