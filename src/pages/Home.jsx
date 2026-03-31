import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Priority Imports (Immediate loads)
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Solution from '../components/Solution';

// Deferred Sections (Lazy loaded only when near viewport)
const Features = React.lazy(() => import('../components/Features'));
const LatestPosts = React.lazy(() => import('../components/LatestPosts'));
const CaseStudies = React.lazy(() => import('../components/CaseStudies'));
const Comparison = React.lazy(() => import('../components/Comparison'));
const Philosophy = React.lazy(() => import('../components/Philosophy'));
const FAQ = React.lazy(() => import('../components/FAQ'));
const FinalCTA = React.lazy(() => import('../components/FinalCTA'));

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
