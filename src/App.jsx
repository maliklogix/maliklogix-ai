import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
const Chatbot = lazy(() => import('./components/Chatbot'));
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const Philosophy = lazy(() => import('./pages/Philosophy'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Founder = lazy(() => import('./pages/Founder'));
const About = lazy(() => import('./pages/About'));
const Legal = lazy(() => import('./pages/Legal'));
const Docs = lazy(() => import('./pages/Docs'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CouponsPage = lazy(() => import('./pages/stack/CouponsPage'));
const YoutubePage = lazy(() => import('./pages/youtube/YoutubePage'));
const InstagramPage = lazy(() => import('./pages/social/InstagramPage'));
const GithubPage = lazy(() => import('./pages/social/GithubPage'));
const XPage = lazy(() => import('./pages/social/XPage'));
const WhatsappPage = lazy(() => import('./pages/social/WhatsappPage'));

// Service Pages
const AiCampaignManagementPage = lazy(() => import('./pages/services/ai-campaign-management'));
const LeadGenerationAiPage = lazy(() => import('./pages/services/lead-generation-ai'));
const ConversionOptimizationPage = lazy(() => import('./pages/services/conversion-optimization'));
const AiAdTargetingPage = lazy(() => import('./pages/services/ai-ad-targeting'));
const FunnelAutomationPage = lazy(() => import('./pages/services/funnel-automation'));
const EmailMarketingAiPage = lazy(() => import('./pages/services/email-marketing-ai'));
const SeoStrategyPage = lazy(() => import('./pages/services/seo-strategy'));
const GeoAiSearchPage = lazy(() => import('./pages/services/geo-ai-search'));
const AiContentCreationPage = lazy(() => import('./pages/services/ai-content-creation'));
const BlogWritingPage = lazy(() => import('./pages/services/blog-writing'));
const KeywordClusteringPage = lazy(() => import('./pages/services/keyword-clustering'));
const ContentTrackingPage = lazy(() => import('./pages/services/content-tracking'));
const N8nAutomationPage = lazy(() => import('./pages/services/n8n-automation'));
const MakeIntegrationsPage = lazy(() => import('./pages/services/make-integrations'));
const AiChatbotsPage = lazy(() => import('./pages/services/ai-chatbots'));
const ShopifyAiPage = lazy(() => import('./pages/services/shopify-ai'));
const CrmAutomationPage = lazy(() => import('./pages/services/crm-automation'));
const ApiDashboardsPage = lazy(() => import('./pages/services/api-dashboards'));

// Tools Pages
const SkillhubPage = lazy(() => import('./pages/tools/openclaw/skillhub'));
const AutomationPage = lazy(() => import('./pages/tools/openclaw/automation'));
const AiSkillsPage = lazy(() => import('./pages/tools/ai-skills'));
const ExtensionsPage = lazy(() => import('./pages/tools/openclaw/extensions'));
const SubmitPage = lazy(() => import('./pages/tools/openclaw/submit'));

// Dashboard
const DashLogin = lazy(() => import('./pages/dash/DashLogin'));
const AuthGuard = lazy(() => import('./components/dash/AuthGuard'));
const DashLayout = lazy(() => import('./components/dash/DashLayout'));
const DashOverview = lazy(() => import('./pages/dash/DashOverview'));
const BlogList = lazy(() => import('./pages/dash/Blog/BlogList'));
const BlogEditor = lazy(() => import('./pages/dash/Blog/BlogEditor'));
const ServiceList = lazy(() => import('./pages/dash/Services/ServiceList'));
const ServiceEditor = lazy(() => import('./pages/dash/Services/ServiceEditor'));
const LeadList = lazy(() => import('./pages/dash/Leads/LeadList'));
const LeadDetail = lazy(() => import('./pages/dash/Leads/LeadDetail'));
const NewsletterList = lazy(() => import('./pages/dash/Newsletter/NewsletterList'));
const CampaignComposer = lazy(() => import('./pages/dash/Newsletter/CampaignComposer'));
const SeoManager = lazy(() => import('./pages/dash/SeoManager'));
const SettingsManager = lazy(() => import('./pages/dash/SettingsManager'));
const MediaManager = lazy(() => import('./pages/dash/Media/MediaManager'));
const LiveAgent = lazy(() => import('./pages/dash/LiveAgent/LiveAgent'));
const ToolsManager = lazy(() => import('./pages/dash/Tools/ToolsManager'));
const ToolEditor = lazy(() => import('./pages/dash/Tools/ToolEditor'));
const SocialMedia = lazy(() => import('./pages/dash/SocialMedia/SocialMedia'));
const StackManager = lazy(() => import('./pages/dash/Stack/StackManager'));
const YoutubeManager = lazy(() => import('./pages/dash/Youtube/YoutubeManager'));
const ToastProvider = lazy(() => import('./components/dash/Toast').then(m => ({ default: m.ToastProvider })));

// Register GSAP plugins (Plugin will be registered locally where needed for better code splitting)
// gsap.registerPlugin(ScrollTrigger);

import { useTheme } from './context/ThemeContext';

const App = () => {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const lenisRef = useRef(null);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dash');

    useEffect(() => {
        // Disable Lenis for Dashboard as it conflicts with the dashboard's internal scroll
        if (isDashboard) return;

        // Defer Lenis and GSAP ticker initialization to minimize main-thread work at startup
        const initAnimations = async () => {
            try {
                const [
                    { default: Lenis },
                    { gsap: gsapLib },
                    { ScrollTrigger }
                ] = await Promise.all([
                    import('lenis'),
                    import('gsap'),
                    import('gsap/ScrollTrigger')
                ]);

                gsapLib.registerPlugin(ScrollTrigger);

                const lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                });

                lenisRef.current = lenis;

                lenis.on('scroll', ScrollTrigger.update);
                gsapLib.ticker.add((time) => { lenis.raf(time * 1000); });
                gsapLib.ticker.lagSmoothing(0);

                // Internal reference for ripple animation
                window._gsap = gsapLib;
            } catch (error) {
                console.error("Failed to load animation libraries:", error);
            }
        };

        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => initAnimations());
        } else {
            setTimeout(initAnimations, 1000);
        }

        // Click Ripple Animation
        const onClick = (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'fixed pointer-events-none rounded-full border-2 border-[#06B6D4] z-[9999]';
            document.body.appendChild(ripple);

            if (!window._gsap) return;
            const gsap = window._gsap;

            gsap.set(ripple, {
                x: e.clientX,
                y: e.clientY,
                xPercent: -50,
                yPercent: -50,
                width: 0,
                height: 0,
                opacity: 0.8
            });

            gsap.to(ripple, {
                width: 50,
                height: 50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        };

        window.addEventListener('click', onClick);

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            window.removeEventListener('click', onClick);
            // Global ticker clean up is handled by the instance destruction or stays for next mount
        };
    }, [location]);

    return (
        <div ref={containerRef} className={`${!isDashboard ? theme : 'light'} relative min-h-screen transition-colors duration-500 bg-[var(--background)] flex flex-col text-[var(--foreground)]`}>
            <ScrollToTop />
            {/* <div className="noise-overlay" /> */}

            {!isDashboard && <Navbar />}

            <main className="flex-grow relative z-10">
                <ToastProvider>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/ai-campaign-management" element={<AiCampaignManagementPage />} />
                        <Route path="/services/lead-generation-ai" element={<LeadGenerationAiPage />} />
                        <Route path="/services/conversion-optimization" element={<ConversionOptimizationPage />} />
                        <Route path="/services/ai-ad-targeting" element={<AiAdTargetingPage />} />
                        <Route path="/services/funnel-automation" element={<FunnelAutomationPage />} />
                        <Route path="/services/email-marketing-ai" element={<EmailMarketingAiPage />} />
                        <Route path="/services/seo-strategy" element={<SeoStrategyPage />} />
                        <Route path="/services/geo-ai-search" element={<GeoAiSearchPage />} />
                        <Route path="/services/ai-content-creation" element={<AiContentCreationPage />} />
                        <Route path="/services/blog-writing" element={<BlogWritingPage />} />
                        <Route path="/services/keyword-clustering" element={<KeywordClusteringPage />} />
                        <Route path="/services/content-tracking" element={<ContentTrackingPage />} />
                        <Route path="/services/n8n-automation" element={<N8nAutomationPage />} />
                        <Route path="/services/make-integrations" element={<MakeIntegrationsPage />} />
                        <Route path="/services/ai-chatbots" element={<AiChatbotsPage />} />
                        <Route path="/services/shopify-ai" element={<ShopifyAiPage />} />
                        <Route path="/services/crm-automation" element={<CrmAutomationPage />} />
                        <Route path="/services/api-dashboards" element={<ApiDashboardsPage />} />
                        
                        <Route path="/tools/openclaw/skillhub" element={<SkillhubPage />} />
                        <Route path="/tools/openclaw/automation" element={<AutomationPage />} />
                        <Route path="/tools/ai-skills" element={<AiSkillsPage />} />
                        <Route path="/tools/openclaw/extensions" element={<ExtensionsPage />} />
                        <Route path="/tools/openclaw/submit" element={<SubmitPage />} />
                        
                        <Route path="/stack/coupons" element={<CouponsPage />} />
                        <Route path="/youtube" element={<YoutubePage />} />
                        <Route path="/instagram" element={<InstagramPage />} />
                        <Route path="/github" element={<GithubPage />} />
                        <Route path="/x" element={<XPage />} />
                        <Route path="/whatsapp" element={<WhatsappPage />} />
                        
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/founder" element={<Founder />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/legal" element={<Legal />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/philosophy" element={<Philosophy />} />
                        <Route path="*" element={<NotFound />} />



                        {/* Dashboard Routes */}
                        <Route path="/dash/login" element={<DashLogin />} />
                        <Route element={<AuthGuard />}>
                            <Route element={<DashLayout />}>
                                <Route path="/dash" element={<DashOverview />} />
                                <Route path="/dash/blog" element={<BlogList />} />
                                <Route path="/dash/blog/new" element={<BlogEditor />} />
                                <Route path="/dash/blog/:id/edit" element={<BlogEditor />} />
                                <Route path="/dash/services" element={<ServiceList />} />
                                <Route path="/dash/services/:slug/edit" element={<ServiceEditor />} />
                                <Route path="/dash/leads" element={<LeadList />} />
                                <Route path="/dash/leads/:id" element={<LeadDetail />} />
                                <Route path="/dash/newsletter" element={<NewsletterList />} />
                                <Route path="/dash/newsletter/new" element={<CampaignComposer />} />
                                <Route path="/dash/media" element={<MediaManager />} />
                                <Route path="/dash/live-agent" element={<LiveAgent />} />
                                <Route path="/dash/seo" element={<SeoManager />} />
                                <Route path="/dash/settings" element={<SettingsManager />} />
                                <Route path="/dash/social-media" element={<SocialMedia />} />
                                <Route path="/dash/stack" element={<StackManager />} />
                                <Route path="/dash/youtube" element={<YoutubeManager />} />
                                <Route path="/dash/tools" element={<ToolsManager />} />
                                <Route path="/dash/tools/:id/edit" element={<ToolEditor />} />
                            </Route>
                        </Route>
                    </Routes>
                    </Suspense>
                </ToastProvider>
            </main>

            {!isDashboard && (
                <>
                    <Footer />
                    <BackToTop />
                    <Suspense fallback={null}>
                        <Chatbot />
                    </Suspense>
                </>
            )}
        </div>
    );
};

export default App;
