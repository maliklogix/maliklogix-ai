import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import ScriptInjector from './components/ScriptInjector';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Philosophy from './pages/Philosophy';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Founder from './pages/Founder';
import About from './pages/About';
import Legal from './pages/Legal';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';
import CouponsPage from './pages/stack/CouponsPage';
import YoutubePage from './pages/youtube/YoutubePage';
import InstagramPage from './pages/social/InstagramPage';
import GithubPage from './pages/social/GithubPage';
import XPage from './pages/social/XPage';
import WhatsappPage from './pages/social/WhatsappPage';



// Service Pages
import AiCampaignManagementPage from './pages/services/ai-campaign-management';
import LeadGenerationAiPage from './pages/services/lead-generation-ai';
import ConversionOptimizationPage from './pages/services/conversion-optimization';
import AiAdTargetingPage from './pages/services/ai-ad-targeting';
import FunnelAutomationPage from './pages/services/funnel-automation';
import EmailMarketingAiPage from './pages/services/email-marketing-ai';
import SeoStrategyPage from './pages/services/seo-strategy';
import GeoAiSearchPage from './pages/services/geo-ai-search';
import AiContentCreationPage from './pages/services/ai-content-creation';
import BlogWritingPage from './pages/services/blog-writing';
import KeywordClusteringPage from './pages/services/keyword-clustering';
import ContentTrackingPage from './pages/services/content-tracking';
import N8nAutomationPage from './pages/services/n8n-automation';
import MakeIntegrationsPage from './pages/services/make-integrations';
import AiChatbotsPage from './pages/services/ai-chatbots';
import ShopifyAiPage from './pages/services/shopify-ai';
import CrmAutomationPage from './pages/services/crm-automation';
import ApiDashboardsPage from './pages/services/api-dashboards';

// Tools Pages
import SkillhubPage from './pages/tools/openclaw/skillhub';
import AutomationPage from './pages/tools/openclaw/automation';
import AiSkillsPage from './pages/tools/ai-skills';
import ExtensionsPage from './pages/tools/openclaw/extensions';
import SubmitPage from './pages/tools/openclaw/submit';

// Dashboard
import DashLogin from './pages/dash/DashLogin';
import AuthGuard from './components/dash/AuthGuard';
import DashLayout from './components/dash/DashLayout';
import DashOverview from './pages/dash/DashOverview';
import BlogList from './pages/dash/Blog/BlogList';
import BlogEditor from './pages/dash/Blog/BlogEditor';
import ServiceList from './pages/dash/Services/ServiceList';
import ServiceEditor from './pages/dash/Services/ServiceEditor';
import LeadList from './pages/dash/Leads/LeadList';
import LeadDetail from './pages/dash/Leads/LeadDetail';
import NewsletterList from './pages/dash/Newsletter/NewsletterList';
import CampaignComposer from './pages/dash/Newsletter/CampaignComposer';
import SeoManager from './pages/dash/SeoManager';
import SettingsManager from './pages/dash/SettingsManager';
import MediaManager from './pages/dash/Media/MediaManager';
import LiveAgent from './pages/dash/LiveAgent/LiveAgent';
import ToolsManager from './pages/dash/Tools/ToolsManager';
import ToolEditor from './pages/dash/Tools/ToolEditor';
import SocialMedia from './pages/dash/SocialMedia/SocialMedia';
import StackManager from './pages/dash/Stack/StackManager';
import YoutubeManager from './pages/dash/Youtube/YoutubeManager';
import { ToastProvider } from './components/dash/Toast';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import { useTheme } from './context/ThemeContext';

const App = () => {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dash');

    useEffect(() => {
        // Disable Lenis for Dashboard as it conflicts with the dashboard's internal scroll
        if (isDashboard) return;

        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Click Ripple Animation
        const onClick = (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'fixed pointer-events-none rounded-full border-2 border-[#06B6D4] z-[9999]';
            document.body.appendChild(ripple);

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
            lenis.destroy();
            window.removeEventListener('click', onClick);
            gsap.ticker.remove(lenis.raf);
        };
    }, [location]);

    return (
        <div ref={containerRef} className={`${!isDashboard ? theme : 'light'} relative min-h-screen transition-colors duration-500 bg-[var(--background)] flex flex-col text-[var(--foreground)]`}>
            <ScrollToTop />
            {/* <div className="noise-overlay" /> */}

            {!isDashboard && <Navbar />}

            <main className="flex-grow relative z-10">
                <ToastProvider>
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
                </ToastProvider>
            </main>

            {!isDashboard && (
                <>
                    <Footer />
                    <BackToTop />
                    <Chatbot />
                    <ScriptInjector />
                </>
            )}
        </div>
    );
};

export default App;
