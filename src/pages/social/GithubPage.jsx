import React from 'react';
import { Github } from 'lucide-react';
import SocialPageLayout from './SocialPageLayout';

const GithubPage = () => {
    const githubContent = [
        {
            title: "Architecture & Open Source",
            paragraphs: [
                "MalikLogix is committed to contributing to the open-source ecosystem. Our GitHub repositories host the core components of our AI integration frameworks, automation scripts, and UI kits that power modern digital experiences.",
                "Explore our repositories to see how we handle high-concurrency systems, implement advanced machine learning models, and create seamless user interfaces. We encourage community contributions and active documentation."
            ]
        },
        {
            title: "Developer First",
            paragraphs: [
                "We provide extensive research into technical roadmaps for developers looking to master AI-driven automation. Our 'Build Logs' are preserved as code repositories, making it easy for you to fork and deploy our solutions locally.",
                "Whether you're looking for a simple Webhook handler or a complex neural search implementation, our GitHub page is the center of our technical brain."
            ]
        }
    ];

    const stats = [
        { label: "Repositories", value: "25+" },
        { label: "Stars", value: "450+" },
        { label: "Pull Requests", value: "112" },
        { label: "Contributors", value: "12" }
    ];

    return (
        <SocialPageLayout 
            platform="GitHub" 
            handle="@maliklogix"
            icon={Github}
            url="https://github.com/maliklogix"
            heroTitle="The MalikLogix Tech Stack."
            heroSubtitle="Transparent, open-source, and architecturally sound. Explore the code that runs our most complex automation systems."
            stats={stats}
            content={githubContent}
            source="github"
        />
    );
};

export default GithubPage;
