import React from 'react';
import { Twitter } from 'lucide-react';
import SocialPageLayout from './SocialPageLayout';

const XPage = () => {
    const xContent = [
        {
            title: "Real-time AI Intelligence",
            paragraphs: [
                "Our X feed (formely Twitter) is where we deliver fast, concise industry updates as they happen. Whether it's a new OpenAI release or a major shift in the digital advertising landscape, you'll hear about it from us first.",
                "We use this platform for light-speed interactions, sharing quick automation tips, and responding directly to our community in public threads."
            ]
        },
        {
            title: "The Pulse of Digital Change",
            paragraphs: [
                "Beyond updates, we share long-form threads that deconstruct successful automation models and marketing campaigns. These deep-dives are designed to be read in under 5 minutes while delivering maximum value.",
                "Join our daily discussions on the future of autonomous systems and the impact of the latest digital policies on business growth."
            ]
        }
    ];

    const stats = [
        { label: "Followers", value: "38K+" },
        { label: "Impressions", value: "3.5M+" },
        { label: "Threads", value: "120+" },
        { label: "Engagement", value: "4.8%" }
    ];

    return (
        <SocialPageLayout 
            platform="X" 
            handle="@maliklogix"
            icon={Twitter}
            url="https://x.com/maliklogix"
            heroTitle="Real-time Industry Insights."
            heroSubtitle="The fastest way to stay updated on AI trends, automation breakthroughs, and digital marketing strategy."
            stats={stats}
            content={xContent}
            source="x"
        />
    );
};

export default XPage;
