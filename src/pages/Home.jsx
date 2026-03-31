import React, { Suspense, useState, useEffect, useRef } from 'react';

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

/**
 * Custom wrapper that only renders children once the container is near the viewport.
 */
const DeferSection = ({ children, fallback }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="w-full min-h-[100px]">
            {isVisible ? children : fallback}
        </div>
    );
};

const SectionSkeleton = React.memo(({ h = '400px' }) => (
    <div className="px-8 lg:px-20 max-w-7xl mx-auto w-full py-16">
        <div className="w-full bg-[var(--card-bg)] animate-pulse rounded-3xl" style={{ minHeight: h }}>
            <div className="w-full h-full opacity-10 bg-gradient-to-tr from-accent/20 to-transparent" />
        </div>
    </div>
));

const Home = () => {
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
            
            <DeferSection fallback={<SectionSkeleton h="500px" />}>
                <Suspense fallback={<SectionSkeleton h="500px" />}>
                    <Features />
                </Suspense>
            </DeferSection>
            
            <DeferSection fallback={<SectionSkeleton h="450px" />}>
                <Suspense fallback={<SectionSkeleton h="450px" />}>
                    <CaseStudies />
                </Suspense>
            </DeferSection>

            <DeferSection fallback={<SectionSkeleton h="400px" />}>
                <Suspense fallback={<SectionSkeleton h="400px" />}>
                    <Comparison />
                </Suspense>
            </DeferSection>

            <DeferSection fallback={<SectionSkeleton h="550px" />}>
                <Suspense fallback={<SectionSkeleton h="550px" />}>
                    <Philosophy />
                </Suspense>
            </DeferSection>

            <DeferSection fallback={<SectionSkeleton h="500px" />}>
                <Suspense fallback={<SectionSkeleton h="500px" />}>
                    <LatestPosts />
                </Suspense>
            </DeferSection>

            <DeferSection fallback={<SectionSkeleton h="400px" />}>
                <Suspense fallback={<SectionSkeleton h="400px" />}>
                    <FAQ />
                </Suspense>
            </DeferSection>

            <DeferSection fallback={<SectionSkeleton h="350px" />}>
                <Suspense fallback={<SectionSkeleton h="350px" />}>
                    <FinalCTA />
                </Suspense>
            </DeferSection>

        </div>
    );
};

export default Home;
