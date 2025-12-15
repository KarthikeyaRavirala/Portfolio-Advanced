import React from 'react';

const Hero = () => {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold text-white">
        Hi, I'm <span className="text-blue-400">Karthikeya</span> 👋
      </h1>

      <p className="mt-4 text-lg text-gray-400 max-w-2xl">
        I'm an AI engineering student who builds and deploys real-world
        machine learning systems — from LLM-powered chatbots to
        real-time computer vision applications.
      </p>

      <p className="mt-4 text-lg text-gray-400 max-w-2xl">
        I enjoy turning complex ideas into practical products that people
        actually use.
      </p>

      <p className="text-sm text-gray-500 mt-4">
        LLMs · RAG · Computer Vision · Deep Learning · Deployment
      </p>
    </section>
  );
};

export default Hero;