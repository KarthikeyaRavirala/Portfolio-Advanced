import React from 'react';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    stats: string;
    live?: string;
    github?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-[#0b1e34] border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white">
        {project.title}
      </h3>
      <p className="text-gray-400 mt-2">{project.description}</p>
      <p className="text-sm text-gray-500 mt-4">{project.stats}</p>
      <div className="flex gap-4 mt-4">
        {project.live && (
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Live Demo
          </a>
        )}
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;