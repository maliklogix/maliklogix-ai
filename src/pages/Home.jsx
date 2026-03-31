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

/**
 * Custom wrapper that only renders children once the container is near the viewport.
 */
const DeferSection = ({ children, h = '500px' }) => {
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
        <div ref={ref} className="w-full" style={{ minHeight: isVisible ? 'auto' : h }}>
            {isVisible ? children : null}
        </div>
    );
};

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
            
            <DeferSection h="550px">
                <Features />
            </DeferSection>
            
            <DeferSection h="600px">
                <CaseStudies />
            </DeferSection>

            <DeferSection h="500px">
                <Comparison />
            </DeferSection>

            <DeferSection h="650px">
                <Philosophy />
            </DeferSection>

            <DeferSection h="600px">
                <LatestPosts />
            </DeferSection>

            <DeferSection h="500px">
                <FAQ />
            </DeferSection>

            <DeferSection h="450px">
                <FinalCTA />
            </DeferSection>

        </div>
    );
};

export default Home;
