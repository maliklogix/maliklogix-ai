import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Priority Imports (Immediate loads for layout stability)
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Solution from '../components/Solution';
import Features from '../components/Features';
import LatestPosts from '../components/LatestPosts';
import CaseStudies from '../components/CaseStudies';
import Comparison from '../components/Comparison';
import Philosophy from '../components/Philosophy';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
    // Centralized debounced ScrollTrigger refresh to mitigate forced reflows
    const refreshScroll = useCallback(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Predictive Prefetching: Pre-load Services and About chunks for instant navigation
    useEffect(() => {
        const timer = setTimeout(() => {
            import('./Services');
            import('./About');
        }, 4000); // 4 Seconds of idle time
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col gap-0">
            <Hero />
            <Stats />
            <Solution />
            <Features />
            <CaseStudies />
            <Comparison />
            <Philosophy />
            <LatestPosts />
            <FAQ />
            <FinalCTA />
        </div>
    );
};

export default Home;
