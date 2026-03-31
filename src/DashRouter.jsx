import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dashboard Components
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

const DashRouter = () => {
    return (
        <ToastProvider>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/login" element={<DashLogin />} />
                    <Route element={<AuthGuard />}>
                        <Route element={<DashLayout />}>
                            <Route index element={<DashOverview />} />
                            <Route path="/blog" element={<BlogList />} />
                            <Route path="/blog/new" element={<BlogEditor />} />
                            <Route path="/blog/:id/edit" element={<BlogEditor />} />
                            <Route path="/blog/edit/:id" element={<BlogEditor />} />
                            <Route path="/services" element={<ServiceList />} />
                            <Route path="/services/:slug/edit" element={<ServiceEditor />} />
                            <Route path="/leads" element={<LeadList />} />
                            <Route path="/leads/:id" element={<LeadDetail />} />
                            <Route path="/newsletter" element={<NewsletterList />} />
                            <Route path="/newsletter/new" element={<CampaignComposer />} />
                            <Route path="/media" element={<MediaManager />} />
                            <Route path="/live-agent" element={<LiveAgent />} />
                            <Route path="/seo" element={<SeoManager />} />
                            <Route path="/settings" element={<SettingsManager />} />
                            <Route path="/social-media" element={<SocialMedia />} />
                            <Route path="/stack" element={<StackManager />} />
                            <Route path="/youtube" element={<YoutubeManager />} />
                            <Route path="/tools" element={<ToolsManager />} />
                            <Route path="/tools/:id/edit" element={<ToolEditor />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </ToastProvider>
    );
};

export default DashRouter;
