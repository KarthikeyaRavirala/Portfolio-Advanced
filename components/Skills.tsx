'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsGlobeContainer from './SkillsGlobe';

const Skills = () => {
  // Define skills for the 3D globe
  const skills = [
    { id: 1, name: "Python", category: "AI", level: 98 },
    { id: 2, name: "TensorFlow", category: "AI", level: 95 },
    { id: 3, name: "PyTorch", category: "AI", level: 92 },
    { id: 4, name: "React", category: "Web", level: 95 },
    { id: 5, name: "Next.js", category: "Web", level: 92 },
    { id: 6, name: "TypeScript", category: "Web", level: 94 },
    { id: 7, name: "AWS", category: "Cloud", level: 88 },
    { id: 8, name: "Docker", category: "DevOps", level: 87 },
    { id: 9, name: "NLP", category: "AI", level: 95 },
    { id: 10, name: "Computer Vision", category: "AI", level: 92 },
    { id: 11, name: "RAG Systems", category: "AI", level: 93 },
    { id: 12, name: "LLM Integration", category: "AI", level: 94 },
    { id: 13, name: "API Development", category: "Web", level: 90 },
    { id: 14, name: "MLOps", category: "DevOps", level: 85 },
    { id: 15, name: "Data Pipeline", category: "Data", level: 90 },
    { id: 16, name: "Node.js", category: "Web", level: 88 },
    { id: 17, name: "GraphQL", category: "Web", level: 85 },
    { id: 18, name: "MongoDB", category: "Database", level: 82 },
    { id: 19, name: "PostgreSQL", category: "Database", level: 87 },
    { id: 20, name: "Kubernetes", category: "DevOps", level: 80 },
    { id: 21, name: "Terraform", category: "DevOps", level: 78 },
    { id: 22, name: "Jenkins", category: "DevOps", level: 82 },
    { id: 23, name: "Git", category: "DevOps", level: 95 },
    { id: 24, name: "CI/CD", category: "DevOps", level: 90 },
    { id: 25, name: "Linux", category: "Systems", level: 88 },
    { id: 26, name: "Bash", category: "Systems", level: 85 },
    { id: 27, name: "OpenCV", category: "AI", level: 93 },
    { id: 28, name: "Scikit-learn", category: "AI", level: 94 },
    { id: 29, name: "Pandas", category: "Data", level: 92 },
    { id: 30, name: "NumPy", category: "Data", level: 94 },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#1B2631] to-[#3F4E4F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Skills & Expertise
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* 3D Globe Visualization */}
        <div className="mb-16">
          <SkillsGlobeContainer skills={skills} />
        </div>

        {/* Detailed Skills Grid - REMOVED PER REQUEST */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skills.slice(0, 15).map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-blue-400 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                ></motion.div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{skill.category}</div>
            </motion.div>
          ))}
        </div> */}

        {/* Additional expertise section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#A5C8D6]/20 to-[#D9E4E0]/20 p-8 rounded-2xl border border-[#A5C8D6]"
        >
          <h3 className="text-2xl font-bold text-[#F0F4F8] mb-6 text-center">Advanced Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "AI Model Development",
              "MLOps & Deployment",
              "Real-time Systems",
              "Data Pipeline Architecture",
              "Tech Content Creation",
              "Innovation Strategy",
              "LLM Optimization",
              "Ethical AI Practices",
              "Edge AI Solutions"
            ].map((capability, index) => (
              <motion.div
                key={capability}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-[#3F4E4F]/50 p-6 rounded-xl text-center hover:border-[#D9E4E0] border border-[#A5C8D6] transition-all"
              >
                <div className="text-[#A5C8D6] text-2xl mb-3">✨</div>
                <h4 className="text-[#F0F4F8] font-medium">{capability}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;