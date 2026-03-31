import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Cpu } from 'lucide-react';

const TOOLS = [
    { label: 'n8n', color: '#ff4d4d', domain: 'n8n.io', txt: '#fff' },
    { label: 'Make', color: '#a855f7', domain: 'make.com', txt: '#fff' },
    { label: 'Zapier', color: '#fb923c', domain: 'zapier.com', txt: '#fff' },
    { label: 'OpenClaw', color: '#0cd0cd', domain: null, txt: '#000' },
    { label: 'OpenAI', color: '#10b981', domain: 'openai.com', txt: '#fff' },
    { label: 'Claude', color: '#fef3c7', domain: 'anthropic.com', txt: '#000' },
    { label: 'Shopify', color: '#a3e635', domain: 'shopify.com', txt: '#000' },
    { label: 'Amazon', color: '#f59e0b', domain: 'amazon.com', txt: '#000' },
    { label: 'Airtable', color: '#facc15', domain: 'airtable.com', txt: '#000' },
    { label: 'Notion', color: '#e5e5e5', domain: 'notion.so', txt: '#000' },
    { label: 'Voiceflow', color: '#3b82f6', domain: 'voiceflow.com', txt: '#fff' },
    { label: 'Vapi', color: '#0ea5e9', domain: 'vapi.ai', txt: '#fff' },
    { label: 'Stripe', color: '#6366f1', domain: 'stripe.com', txt: '#fff' },
    { label: 'Python', color: '#38bdf8', domain: 'python.org', txt: '#000' },
    { label: 'React', color: '#2dd4bf', domain: 'reactjs.org', txt: '#000' },
    { label: 'LangChain', color: '#166534', domain: 'langchain.com', txt: '#fff' },
    { label: 'Pinecone', color: '#1e3a8a', domain: 'pinecone.io', txt: '#fff' },
    { label: 'Playwright', color: '#4ade80', domain: 'playwright.dev', txt: '#000' },
    { label: 'Puppeteer', color: '#06b6d4', domain: 'pptr.dev', txt: '#fff' },
    { label: 'Slack', color: '#d946ef', domain: 'slack.com', txt: '#fff' },
    { label: 'Excel', color: '#16a34a', domain: 'microsoft.com', txt: '#fff' },
    { label: 'Meta', color: '#2563eb', domain: 'meta.com', txt: '#fff' },
    { label: 'Google', color: '#ef4444', domain: 'google.com', txt: '#fff' },
    { label: 'HubSpot', color: '#ff7a59', domain: 'hubspot.com', txt: '#000' }
];

const ToolPhysicsEngine = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const nodesRef = useRef([]);
    const [isDraggable, setIsDraggable] = useState(false);

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        const width = sceneRef.current.clientWidth || 800;
        const height = sceneRef.current.clientHeight || 500;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: { width, height, background: 'transparent', wireframes: false, hasBounds: true }
        });

        render.canvas.style.position = 'absolute';
        render.canvas.style.top = '0';
        render.canvas.style.left = '0';
        render.canvas.style.opacity = '0';
        render.canvas.style.zIndex = '50';

        const wallOptions = { isStatic: true, render: { visible: false }, friction: 0, restitution: 0.8 };
        const walls = [
            Bodies.rectangle(width / 2, -50, width + 200, 100, wallOptions),
            Bodies.rectangle(width / 2, height + 50, width + 200, 100, wallOptions),
            Bodies.rectangle(-50, height / 2, 100, height + 200, wallOptions),
            Bodies.rectangle(width + 50, height / 2, 100, height + 200, wallOptions)
        ];

        // Central "Engine" Node (Static)
        const centerEngine = Bodies.circle(width / 2, height / 2, 80, {
            isStatic: true,
            restitution: 1.1, // Extra bouncy core
            render: { visible: false }
        });
        
        World.add(engine.world, [...walls, centerEngine]);

        const circles = TOOLS.map((tool, index) => {
            const radius = 25;
            // Spawn them away from the center to avoid immediate sticking
            const x = Math.random() > 0.5 ? Math.random() * (width / 3) : width - Math.random() * (width / 3);
            const y = Math.random() * (height - 100) + 50;
            
            const circle = Bodies.circle(x, y, radius, {
                restitution: 0.95,
                friction: 0.001,
                frictionAir: 0.015,
                density: 0.05,
                render: { visible: false }
            });
            circle.toolIndex = index;
            
            Matter.Body.setVelocity(circle, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10
            });
            
            return circle;
        });

        World.add(engine.world, circles);

        Events.on(engine, 'afterUpdate', () => {
            circles.forEach((circle, i) => {
                const node = nodesRef.current[i];
                if (node) {
                    node.style.transform = `translate(${circle.position.x - 25}px, ${circle.position.y - 25}px) rotate(${circle.angle}rad)`;
                }
            });
        });

        Events.on(engine, 'beforeUpdate', () => {
            circles.forEach(circle => {
                if (Math.abs(circle.velocity.x) < 0.2 && Math.abs(circle.velocity.y) < 0.2) {
                    // Pull gently toward the center engine to cause collisions
                    const dx = (width / 2) - circle.position.x;
                    const dy = (height / 2) - circle.position.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist > 100) {
                        Matter.Body.applyForce(circle, circle.position, {
                            x: (dx / dist) * 0.003,
                            y: (dy / dist) * 0.003
                        });
                    }
                }
            });
        });

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });
        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        Events.on(mouseConstraint, 'startdrag', () => setIsDraggable(true));
        Events.on(mouseConstraint, 'enddrag', () => setIsDraggable(false));

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const handleResize = () => {
            const newWidth = sceneRef.current?.clientWidth || window.innerWidth;
            const newHeight = sceneRef.current?.clientHeight || 500;
            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            
            Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: -50 });
            Matter.Body.setPosition(walls[1], { x: newWidth / 2, y: newHeight + 50 });
            Matter.Body.setPosition(walls[2], { x: -50, y: newHeight / 2 });
            Matter.Body.setPosition(walls[3], { x: newWidth + 50, y: newHeight / 2 });
            Matter.Body.setPosition(centerEngine, { x: newWidth / 2, y: newHeight / 2 });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (engineRef.current) {
                World.clear(engineRef.current.world);
                Engine.clear(engineRef.current);
            }
            if (render.canvas && document.contains(render.canvas)) {
                render.canvas.remove();
            }
        };
    }, []);

    return (
        <div className="w-full h-[500px] md:h-[600px] relative overflow-hidden" ref={sceneRef}>
            {/* Ambient Background FX */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-[var(--card-bg)] pointer-events-none" />
            
            {/* Central Static Engine Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full bg-[var(--background)] border-4 border-[var(--border)] shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center z-10 pointer-events-none transition-colors">
                <Cpu className="text-accent w-10 h-10 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <span className="text-sm font-display font-bold text-[var(--foreground)] tracking-widest uppercase">The Engine</span>
            </div>

            {/* DOM Rendered Physics Bodies */}
            <div className={`absolute inset-0 z-20 pointer-events-none ${isDraggable ? 'cursor-grabbing' : 'cursor-grab'}`}>
                {TOOLS.map((tool, i) => (
                    <div 
                        key={i}
                        ref={el => nodesRef.current[i] = el}
                        className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-colors duration-200"
                        style={{
                            border: `3px solid ${tool.color}`,
                            backgroundColor: 'white',
                            willChange: 'transform'
                        }}
                    >
                        {tool.domain && (
                            <img 
                                src={`https://logo.clearbit.com/${tool.domain}`} 
                                alt={tool.label} 
                                className="w-7 h-7 object-contain pointer-events-none" 
                                onError={(e) => { 
                                    e.target.style.display = 'none'; 
                                    const sibling = e.target.nextElementSibling;
                                    if (sibling) {
                                        sibling.style.display = 'flex'; 
                                        e.target.parentElement.style.backgroundColor = tool.color;
                                        sibling.style.color = tool.txt;
                                    }
                                }} 
                            />
                        )}
                        <span 
                            className="text-[11px] font-bold font-mono text-center leading-none px-1 pointer-events-none drop-shadow-sm w-full h-full items-center justify-center"
                            style={{ 
                                display: tool.domain ? 'none' : 'flex', 
                                backgroundColor: tool.color,
                                color: tool.txt || '#ffffff' 
                            }}
                        >
                            {tool.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolPhysicsEngine;
