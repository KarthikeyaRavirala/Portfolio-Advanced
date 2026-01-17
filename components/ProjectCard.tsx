'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    stats: string;
    live?: string;
    github?: string;
    tech?: string[];
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Determine the link to use (live demo first, then GitHub)
  const projectLink = project.live || project.github || '#';

  // Add emojis based on project type
  const getTitleWithEmoji = (title: string) => {
    if (title.includes('GPT') || title.includes('AI') || title.includes('Chatbot')) {
      return `${title} 🤖`;
    } else if (title.includes('Sign') || title.includes('Translation')) {
      return `${title} 🗣️`;
    } else if (title.includes('Cam') || title.includes('Recognition')) {
      return `${title} 📸`;
    } else {
      return `${title} 💻`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-colors">
          {getTitleWithEmoji(project.title)}
        </h3>
        <div className="flex space-x-2">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.live && (
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Live Demo"
            >
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">
        {project.description}
      </p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.tech?.slice(0, 3).map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech && project.tech.length > 3 && (
            <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        {project.stats}
      </p>
    </motion.div>
  );
};

export default ProjectCard;