'use client'
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utilities/cn';
import { useState } from 'react';

const data = [
    {title: 'OPTrust',
        description: 'Technical Support Analyst Internship',
        link: 'https://optrust.com',
        imageUrl: '/images/optrust.jpg',
        tags: ['Microsoft_Intune', 'Support']
    },
    {title: 'OPTrust',
        description: 'Technical Support Analyst Internship',
        link: 'https://optrust.com',
        imageUrl: '/images/optrust.jpg',
        tags: ['Microsoft_Intune', 'Support']
    },
    {title: 'OPTrust',
        description: 'Technical Support Analyst Internship',
        link: 'https://optrust.com',
        imageUrl: '/images/optrust.jpg',
        tags: ['Microsoft_Intune', 'Support']
    },
];

export const ProjectsComponent = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredProject, setHoveredProject] = useState(null);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="py-8 font-mono relative" onMouseMove={handleMouseMove}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((project, index) => (
                    <div 
                        key={index} 
                        className="group"
                        onMouseEnter={() => setHoveredProject(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="flex flex-col h-full bg-zinc-900/50 p-6 transition-all duration-300">
                            <Link 
                                href={project.link} 
                                target="_blank" 
                                className="group-hover:text-yellow-400 transition-colors duration-300"
                            >
                                <h3 className="text-xl font-normal mb-2 underline underline-offset-4">{project.title}</h3>
                            </Link>
                            <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Image Preview */}
            {hoveredProject && (
                <div 
                    className="fixed pointer-events-none z-50 transition-opacity duration-200"
                    style={{
                        left: `${mousePosition.x + 20}px`,
                        top: `${mousePosition.y - 100}px`,
                        opacity: hoveredProject ? 1 : 0
                    }}
                >
                    <div className="w-64 h-48 relative rounded-lg overflow-hidden shadow-xl">
                        <Image 
                            src={hoveredProject.imageUrl}
                            alt={hoveredProject.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {hoveredProject.tags.map((tag, tagIndex) => (
                            <span 
                                key={tagIndex} 
                                className="text-xs font-normal text-zinc-200 bg-zinc-800/80 px-2 py-1 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};