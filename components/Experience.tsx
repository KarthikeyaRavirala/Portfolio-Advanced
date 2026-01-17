'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

// Import experience data directly
const experience: ExperienceItem[] = [
  {
    id: 1,
    company: "Anurag University",
    role: "AI Research & Development",
    period: "2022 - Present",
    achievements: [
      "Developed Anurag-GPT, an AI-powered university assistant with 90%+ query relevance accuracy",
      "Created multiple AI solutions including real-time sign language translation systems",
      "Implemented RAG pipelines and LLM integrations for academic use cases",
      "Mentored students in AI/ML projects and conducted technical workshops"
    ]
  },
  {
    id: 2,
    company: "Tech Projects",
    role: "AI Engineer & Tech Creator",
    period: "2021 - Present",
    achievements: [
      "Built 10+ full-stack applications with AI/ML integration",
      "Developed computer vision systems for real-time applications",
      "Implemented MLOps pipelines for model deployment and monitoring"
    ]
  },
  {
    id: 3,
    company: "Hackathons & Competitions",
    role: "AI Solutions Developer",
    period: "2020 - Present",
    achievements: [
      "Won multiple hackathons with innovative AI-powered healthcare solutions",
      "Developed real-time systems using React, Node.js, and TensorFlow",
      "Collaborated on cross-functional teams to deliver end-to-end solutions",
      "Implemented NLP and computer vision models for practical applications"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-[#3F4E4F] to-[#1B2631]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Experience & Impact
          </h2>
          <p className="text-[#A5C8D6] max-w-2xl mx-auto text-lg">
            Professional journey and key achievements that shaped my expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#A5C8D6] to-[#D9E4E0] rounded-full hidden lg:block"></div>
          
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 lg:static lg:transform-none transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] rounded-full z-10 hidden lg:block"></div>
                
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'} mb-8 lg:mb-0`}>
                  <h3 className="text-2xl font-bold text-[#F0F4F8] mb-2">{exp.company}</h3>
                  <p className="text-[#A5C8D6] font-medium mb-3">{exp.role}</p>
                  <p className="text-[#A5C8D6]">{exp.period}</p>
                </div>
                
                <div className="lg:w-2/12 hidden lg:block"></div>
                
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16 lg:text-right'} ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                  <div className="bg-[#3F4E4F]/30 p-6 rounded-2xl border border-[#A5C8D6]">
                    <h4 className="text-lg font-semibold text-[#F0F4F8] mb-3">Key Achievements</h4>
                    <ul className="space-y-2 text-[#A5C8D6]">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#A5C8D6] mr-2 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: '12+', label: 'Projects Delivered', description: 'AI-powered solutions' },
            { number: '50K+', label: 'Lines of Code', description: 'Reviewed & deployed' },
            { number: '100%', label: 'Success Rate', description: 'Satisfied clients & users' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-[#3F4E4F]/30 to-[#1B2631]/30 rounded-2xl border border-[#A5C8D6]">
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <h4 className="text-xl font-semibold text-[#F0F4F8] mb-2">{stat.label}</h4>
              <p className="text-[#A5C8D6]">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;