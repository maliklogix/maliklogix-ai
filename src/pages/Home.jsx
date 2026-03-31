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

const SectionSkeleton = ({ h = '400px' }) => (
    <div className="px-8 lg:px-20 max-w-7xl mx-auto w-full py-16">
        <div className="w-full bg-[var(--card-bg)] animate-pulse rounded-3xl" style={{ minHeight: h }}>
            <div className="w-full h-full opacity-10 bg-gradient-to-tr from-accent/20 to-transparent" />
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="flex flex-col gap-0">
            <Hero />
            <Stats />
            
            <Suspense fallback={<SectionSkeleton h="600px" />}>
                <Solution />
            </Suspense>
            
            <Suspense fallback={<SectionSkeleton h="500px" />}>
                <Features />
            </Suspense>
            
            <Suspense fallback={<SectionSkeleton h="450px" />}>
                <CaseStudies />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="400px" />}>
                <Comparison />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="550px" />}>
                <Philosophy />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="500px" />}>
                <LatestPosts />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="400px" />}>
                <FAQ />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="350px" />}>
                <FinalCTA />
            </Suspense>

        </div>
    );
};

export default Home;
