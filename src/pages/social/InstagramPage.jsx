import React from 'react';
import { Instagram } from 'lucide-react';
import SocialPageLayout from './SocialPageLayout';

const InstagramPage = () => {
    const instagramContent = [
        {
            title: "Beyond the Visuals",
            paragraphs: [
                "Our Instagram presence is more than just aesthetics; it's where we showcase the day-to-day innovation at MalikLogix. From behind-the-scenes looks at our latest AI development sprints to high-impact automation hacks, we bring you closer to the pulse of current digital trends.",
                "We focus on providing value-packed reels and carousel guides that help you understand complex digital marketing concepts in under 60 seconds. Our community here is built on sharing inspiration and actionable insights for modern entrepreneurs."
            ]
        },
        {
            title: "Join the Conversation",
            paragraphs: [
                "We believe in the power of social learning. Tag us in your automation builds, or send us a DM to discuss how AI is reshaping your industry. We host regular Q&A sessions in our stories to address your most pressing technical challenges.",
                "Our Instagram strategy is built on absolute transparency. Whether we're testing a new LLM integration or optimizing a client's lead generation funnel, you'll find the raw, unfiltered progress reports right here."
            ]
        }
    ];

    const stats = [
        { label: "Community", value: "25K+" },
        { label: "Daily Reach", value: "100K+" },
        { label: "Guides Shared", value: "450+" },
        { label: "Reel Views", value: "1.2M+" }
    ];

    return (
        <SocialPageLayout 
            platform="Instagram" 
            handle="@maliklogix"
            icon={Instagram}
            url="https://instagram.com/maliklogix"
            heroTitle="Visualizing Digital Innovation."
            heroSubtitle="Witness the evolution of MalikLogix through high-impact visual stories, tutorials, and behind-the-scenes technical break-downs."
            stats={stats}
            content={instagramContent}
            source="instagram"
        />
    );
};

export default InstagramPage;
