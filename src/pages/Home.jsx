import React, { Suspense } from 'react';

// Import Sections
import Hero from '../components/Hero';
import Stats from '../components/Stats';
const Solution = React.lazy(() => import('../components/Solution'));
const Features = React.lazy(() => import('../components/Features'));
const LatestPosts = React.lazy(() => import('../components/LatestPosts'));
const CaseStudies = React.lazy(() => import('../components/CaseStudies'));
const Comparison = React.lazy(() => import('../components/Comparison'));
const Philosophy = React.lazy(() => import('../components/Philosophy'));
const FAQ = React.lazy(() => import('../components/FAQ'));
const FinalCTA = React.lazy(() => import('../components/FinalCTA'));

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Suspense fallback={null}>
                <Solution />
                <Features />
                <CaseStudies />
                <Comparison />
                <Philosophy />
                <LatestPosts />
                <FAQ />
                <FinalCTA />
            </Suspense>
        </>
    );
};

export default Home;
