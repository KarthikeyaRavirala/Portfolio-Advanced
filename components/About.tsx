'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#1B2631] to-[#3F4E4F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-[#F0F4F8]">
              Innovative <span className="gradient-text">AI Engineer</span> & Tech Creator
            </h3>
            <p className="text-[#A5C8D6] mb-6 leading-relaxed">
              I specialize in transforming complex technological concepts into practical, real-world solutions.
            </p>
            <p className="text-[#A5C8D6] mb-6 leading-relaxed">
              With expertise in machine learning, computer vision, and natural language processing, I design intelligent systems that bridge innovation and implementation.
            </p>
            <p className="text-[#A5C8D6] mb-8 leading-relaxed">
              My passion lies in building <span className="text-[#A5C8D6] font-semibold">AI-powered applications</span> that solve meaningful problems — combining technical excellence with creative problem-solving to deliver <span className="text-[#A5C8D6] font-semibold">impact</span> for both technical and non-technical audiences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#3F4E4F]/50 p-6 rounded-xl border border-[#A5C8D6]">
                <FaCode className="text-[#A5C8D6] text-3xl mb-3" />
                <h4 className="text-xl font-semibold mb-2 text-[#F0F4F8]">AI Engineering</h4>
                <p className="text-[#A5C8D6] text-sm">Machine Learning</p>
              </div>
              <div className="bg-[#3F4E4F]/50 p-6 rounded-xl border border-[#A5C8D6]">
                <FaRocket className="text-[#D9E4E0] text-3xl mb-3" />
                <h4 className="text-xl font-semibold mb-2 text-[#F0F4F8]">Tech Creator</h4>
                <p className="text-[#A5C8D6] text-sm">LinkedIn Top Creator</p>
              </div>
              <div className="bg-[#3F4E4F]/50 p-6 rounded-xl border border-[#A5C8D6]">
                <FaChartLine className="text-[#F0F4F8] text-3xl mb-3" />
                <h4 className="text-xl font-semibold mb-2 text-[#F0F4F8]">Impact</h4>
                <p className="text-[#A5C8D6] text-sm">Real-World Solutions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-3/4 h-3/4">
              <img 
                src="/LinkedIn.png" 
                alt="Karthikeya Ravirala LinkedIn Profile" 
                className="w-full h-full object-cover rounded-xl"
                width={384}
                height={384}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;