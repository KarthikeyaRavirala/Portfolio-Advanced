import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const Projects = () => {
  return (
    <section className="max-w-5xl mx-auto px-6">
      <h2 className="text-gray-400 mb-6">Side projects I've built</h2>
      <div className="space-y-4">
        {projects.map((project: any, index: number) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;