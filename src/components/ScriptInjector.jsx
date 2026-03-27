import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScriptInjector = () => {
    const location = useLocation();

    useEffect(() => {
        const fetchAndInject = async () => {
            try {
                // Fetch config from public folder
                const response = await fetch('/scripts-config.json');
                const config = await response.json();
                
                if (!config || !config.scripts) return;

                // Check for Test Mode
                const searchParams = new URLSearchParams(window.location.search);
                const isPreview = searchParams.get('ml_preview') === '1';
                if (config.testMode && !isPreview) return;

                const pathname = location.pathname;

                config.scripts.forEach(script => {
                    if (!script.enabled) return;

                    // Targeting Logic
                    let shouldInject = false;
                    if (script.injectOn === 'all') {
                        shouldInject = true;
                    } else if (script.injectOn === 'homepage') {
                        shouldInject = pathname === '/';
                    }

                    if (shouldInject) {
                        injectScript(script);
                    }
                });
            } catch (err) {
                console.error('ScriptInjector Error:', err);
            }
        };

        // Run after initial mount
        fetchAndInject();
    }, [location.pathname]);

    const injectScript = (script) => {
        const id = `ml-script-${script.id}`;
        if (document.getElementById(id)) return; // Prevent duplicates

        const container = document.head;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = script.code.trim();

        const children = Array.from(tempDiv.childNodes);
        
        children.forEach(node => {
            if (node.nodeName === 'SCRIPT') {
                const newScript = document.createElement('script');
                newScript.id = id;
                
                // Copy attributes
                Array.from(node.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                // Performance Strategy
                if (script.strategy === 'afterInteractive' || script.strategy === 'lazyOnload') {
                    newScript.async = true;
                }

                if (node.src) {
                    newScript.src = node.src;
                } else {
                    newScript.textContent = node.textContent;
                }

                container.appendChild(newScript);
            } else if (node.nodeName === 'META' || node.nodeName === 'LINK') {
                const newNode = document.createElement(node.nodeName);
                newNode.id = id;
                Array.from(node.attributes).forEach(attr => {
                    newNode.setAttribute(attr.name, attr.value);
                });
                container.appendChild(newNode);
            }
        });
    };

    return null; // Invisible component
};

export default ScriptInjector;
