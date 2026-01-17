'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Expanded set of main categories
  const categories = ['All', 'AI', 'Web Dev', 'Mobile', 'Data Science', 'Backend', 'Cloud', 'DevOps', 'Security', 'Game Dev', 'IoT', 'Blockchain', 'AR/VR', 'ML Ops', 'UI/UX', 'API', 'Quantum', 'Robotics', 'Bioinformatics', 'FinTech'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => {
        if (selectedCategory === 'AI') return project.tech?.some(tech => ['AI', 'LLM', 'NLP', 'Machine Learning', 'Computer Vision', 'TensorFlow', 'PyTorch', 'LSTM', 'OpenAI', 'LangChain'].includes(tech));
        if (selectedCategory === 'Web Dev') return project.tech?.some(tech => ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind CSS', 'Node.js', 'HTML'].includes(tech));
        if (selectedCategory === 'Mobile') return project.tech?.some(tech => ['React Native', 'Mobile', 'iOS', 'Android'].includes(tech));
        if (selectedCategory === 'Data Science') return project.tech?.some(tech => ['Python', 'Pandas', 'NumPy', 'Data Science', 'SQL', 'Analytics'].includes(tech));
        if (selectedCategory === 'Backend') return project.tech?.some(tech => ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST API', 'API', 'Spring Boot', 'Java'].includes(tech));
        if (selectedCategory === 'Cloud') return project.tech?.some(tech => ['AWS', 'Azure', 'GCP', 'Cloud', 'Serverless', 'Lambda', 'EC2', 'S3'].includes(tech));
        if (selectedCategory === 'DevOps') return project.tech?.some(tech => ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitLab', 'Terraform', 'Ansible', 'Linux'].includes(tech));
        if (selectedCategory === 'Security') return project.tech?.some(tech => ['Cybersecurity', 'Encryption', 'OAuth', 'JWT', 'SSL', 'Firewall', 'Penetration Testing', 'Cryptography'].includes(tech));
        if (selectedCategory === 'Game Dev') return project.tech?.some(tech => ['Unity', 'Unreal Engine', 'C#', 'Game Development', '3D', '2D', 'Physics', 'Animation'].includes(tech));
        if (selectedCategory === 'IoT') return project.tech?.some(tech => ['Arduino', 'Raspberry Pi', 'Embedded Systems', 'Sensors', 'ESP32', 'Microcontrollers', 'Hardware', 'Firmware'].includes(tech));
        if (selectedCategory === 'AR/VR') return project.tech?.some(tech => ['AR', 'VR', 'Augmented Reality', 'Virtual Reality', 'Unity 3D', 'Spatial Computing', 'Immersive Experience'].includes(tech));
        if (selectedCategory === 'Blockchain') return project.tech?.some(tech => ['Blockchain', 'Ethereum', 'Smart Contracts', 'Solidity', 'Web3', 'Crypto', 'DApps', 'DeFi'].includes(tech));
        if (selectedCategory === 'ML Ops') return project.tech?.some(tech => ['MLOps', 'Model Deployment', 'Model Monitoring', 'Feature Store', 'ML Pipeline', 'A/B Testing', 'Experiment Tracking'].includes(tech));
        if (selectedCategory === 'UI/UX') return project.tech?.some(tech => ['UI', 'UX', 'Figma', 'Design Systems', 'Prototyping', 'User Research', 'Interaction Design', 'Visual Design'].includes(tech));
        if (selectedCategory === 'Quantum') return project.tech?.some(tech => ['Quantum Computing', 'Qiskit', 'Quantum Algorithms', 'Quantum Information', 'Superposition', 'Entanglement'].includes(tech));
        if (selectedCategory === 'API') return project.tech?.some(tech => ['API', 'REST API', 'GraphQL', 'Swagger', 'Postman', 'API Gateway', 'Microservices', 'Integration'].includes(tech));
        if (selectedCategory === 'Robotics') return project.tech?.some(tech => ['Robotics', 'ROS', 'Robot Operating System', 'Motion Planning', 'Control Systems', 'Sensors', 'Actuators'].includes(tech));
        if (selectedCategory === 'Bioinformatics') return project.tech?.some(tech => ['Bioinformatics', 'Computational Biology', 'Genomics', 'Proteomics', 'Sequence Analysis', 'Biostatistics', 'Structural Biology'].includes(tech));
        if (selectedCategory === 'FinTech') return project.tech?.some(tech => ['FinTech', 'Financial Technology', 'Payment Systems', 'Risk Assessment', 'Algorithmic Trading', 'RegTech', 'InsurTech'].includes(tech));
        return false;
      });
  
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#1B2631] to-[#3F4E4F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-[#A5C8D6] max-w-2xl mx-auto text-lg">
            Innovative solutions showcasing technical expertise and creative problem-solving
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category 
                ? 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631]' 
                : 'bg-[#3F4E4F]/50 text-[#A5C8D6] hover:bg-[#A5C8D6]/50'}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default Projects;