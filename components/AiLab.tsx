'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiSend, FiRefreshCw, FiFileText, FiMessageSquare, FiUser, FiCheckCircle } from 'react-icons/fi';

const AiLab = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'chatbot'>('resume');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<{id: number; text: string; isUser: boolean; timestamp: Date}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      alert('Please upload a resume file first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      
      const response = await fetch('/api/analyze-resume', { method: 'POST', body: formData });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResumeAnalysis(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
  
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: chatInput,
      isUser: true,
      timestamp: new Date()
    };
      
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatting(true);
  
    try {
      const response = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: chatInput })
      }); 
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
      const data = await response.json();
        
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };
        
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  const resetResumeAnalysis = () => {
    setResumeFile(null);
    setResumeAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="ai-lab" className="py-20 bg-gradient-to-b from-[#1B2631] to-[#3F4E4F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            🤖 AI Lab
          </h2>
          <p className="text-[#A5C8D6] max-w-2xl mx-auto text-lg">
            Applied AI systems showcasing NLP, RAG, and semantic search capabilities
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#3F4E4F]/50 p-1 rounded-xl flex border border-[#A5C8D6]">
            <button
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'resume'
                  ? 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] font-medium'
                  : 'text-[#A5C8D6] hover:text-[#F0F4F8]'
              }`}
              onClick={() => setActiveTab('resume')}
            >
              <div className="flex items-center">
                <FiFileText className="mr-2" /> AI Resume Analyzer
              </div>
            </button>
            <button
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'chatbot'
                  ? 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] font-medium'
                  : 'text-[#A5C8D6] hover:text-[#F0F4F8]'
              }`}
              onClick={() => setActiveTab('chatbot')}
            >
              <div className="flex items-center">
                <FiMessageSquare className="mr-2" /> Portfolio Chatbot
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[#3F4E4F]/30 rounded-2xl border border-[#A5C8D6] p-8">
          {activeTab === 'resume' ? (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#F0F4F8] mb-2">AI Resume Analyzer & Skill Gap Advisor</h3>
                <p className="text-[#A5C8D6]">Upload your resume for AI-powered analysis and improvement suggestions</p>
              </div>

              {!resumeAnalysis ? (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#A5C8D6] rounded-xl bg-[#1B2631]/30">
                    <FiUpload className="text-[#A5C8D6] text-4xl mb-4" />
                    <p className="text-[#A5C8D6] mb-4">Upload your resume (PDF format)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] font-medium rounded-xl hover:opacity-90 transition-opacity"
                    >
                      {resumeFile ? resumeFile.name : 'Choose PDF File'}
                    </button>
                    {resumeFile && (
                      <p className="text-[#D9E4E0] text-sm mt-2 flex items-center">
                        <FiCheckCircle className="mr-1" /> {resumeFile.name}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleAnalyzeResume}
                      disabled={!resumeFile || isAnalyzing}
                      className={`px-8 py-4 rounded-xl font-medium flex items-center ${
                        !resumeFile || isAnalyzing
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] hover:opacity-90'
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <FiRefreshCw className="animate-spin mr-2" /> Analyzing...
                        </>
                      ) : (
                        <>
                          <FiUser className="mr-2" /> Analyze Resume
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-[#F0F4F8]">Analysis Results</h4>
                    <button
                      onClick={resetResumeAnalysis}
                      className="px-4 py-2 bg-[#3F4E4F] text-[#A5C8D6] rounded-lg hover:bg-[#A5C8D6] hover:text-[#1B2631] transition-colors"
                    >
                      Analyze Another Resume
                    </button>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1B2631]/50 p-6 rounded-xl border border-[#A5C8D6]">
                      <h5 className="text-lg font-semibold text-[#A5C8D6] mb-2">Skills Identified</h5>
                      <p className="text-3xl font-bold gradient-text">{resumeAnalysis.resume_info.total_skills_found}</p>
                    </div>
                    <div className="bg-[#1B2631]/50 p-6 rounded-xl border border-[#A5C8D6]">
                      <h5 className="text-lg font-semibold text-[#A5C8D6] mb-2">Match Score</h5>
                      <p className="text-3xl font-bold gradient-text">{resumeAnalysis.scoring_result.composite_score}%</p>
                    </div>
                    <div className="bg-[#1B2631]/50 p-6 rounded-xl border border-[#A5C8D6]">
                      <h5 className="text-lg font-semibold text-[#A5C8D6] mb-2">Experience</h5>
                      <p className="text-3xl font-bold gradient-text">{resumeAnalysis.resume_info.experience_info.years_experience}</p>
                    </div>
                  </div>

                  {/* Skills Breakdown */}
                  <div>
                    <h5 className="text-lg font-semibold text-[#F0F4F8] mb-4">Skills by Category</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(resumeAnalysis.resume_info.skills_by_category).map(([category, skills]) => {
                        const typedSkills = Array.isArray(skills) ? skills : [];
                        return (
                          <div key={category} className="bg-[#1B2631]/50 p-4 rounded-xl border border-[#A5C8D6]">
                            <h6 className="font-medium text-[#A5C8D6] capitalize mb-2">{category}</h6>
                            <div className="flex flex-wrap gap-2">
                              {typedSkills.map((skill: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 bg-[#A5C8D6]/20 text-[#F0F4F8] rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Job Role Analysis */}
                  <div>
                    <h5 className="text-lg font-semibold text-[#F0F4F8] mb-4">Job Role Match Analysis</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(resumeAnalysis.skill_analysis).map(([role, data]: [string, any]) => (
                        <div key={role} className="bg-[#1B2631]/50 p-6 rounded-xl border border-[#A5C8D6]">
                          <div className="flex justify-between items-start mb-4">
                            <h6 className="font-bold text-[#F0F4F8]">{role}</h6>
                            <span className="px-3 py-1 bg-[#A5C8D6]/20 text-[#F0F4F8] rounded-full text-sm">
                              {data.match_percentage}% match
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="text-[#A5C8D6] text-sm mb-1">Matching Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {data.matching_skills.map((skill: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[#A5C8D6] text-sm mb-1">Skills to Develop:</p>
                            <div className="flex flex-wrap gap-2">
                              {data.missing_skills.map((skill: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvement Suggestions */}
                  <div>
                    <h5 className="text-lg font-semibold text-[#F0F4F8] mb-4">Improvement Suggestions</h5>
                    <div className="space-y-4">
                      {resumeAnalysis.improvement_tips.map((tip: string, idx: number) => (
                        <div key={idx} className="flex items-start p-4 bg-[#1B2631]/50 rounded-xl border border-[#A5C8D6]">
                          <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                          <p className="text-[#F0F4F8]">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#F0F4F8] mb-2">AI Portfolio Chatbot (RAG-based)</h3>
                <p className="text-[#A5C8D6]">Ask questions about my projects, skills, and experience</p>
              </div>

              {/* Chat Interface */}
              <div className="bg-[#1B2631]/50 rounded-xl border border-[#A5C8D6] h-[500px] flex flex-col">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[#A5C8D6]">
                      <div className="text-center">
                        <FiMessageSquare className="mx-auto text-4xl mb-4" />
                        <p>Ask me about Karthikeya's projects, skills, or experience!</p>
                        <p className="text-sm mt-2">Try: "Tell me about your projects" or "What technologies do you know?"</p>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 ${
                            message.isUser
                              ? 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] rounded-br-none'
                              : 'bg-[#3F4E4F] text-[#F0F4F8] rounded-bl-none'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))
                  )}
                  {isChatting && (
                    <div className="flex justify-start">
                      <div className="bg-[#3F4E4F] text-[#F0F4F8] rounded-2xl rounded-bl-none p-4 max-w-[80%]">
                        <div className="flex items-center">
                          <FiRefreshCw className="animate-spin mr-2" />
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-[#A5C8D6] p-4">
                  <form onSubmit={handleChatSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about projects, skills, or experience..."
                      className="flex-1 bg-[#3F4E4F] text-[#F0F4F8] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A5C8D6]"
                      disabled={isChatting}
                      suppressHydrationWarning={true}
                    />
                    <button
                      type="submit"
                      disabled={isChatting || !chatInput.trim()}
                      className={`px-6 py-3 rounded-xl flex items-center ${
                        isChatting || !chatInput.trim()
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] hover:opacity-90'
                      }`}
                    >
                      <FiSend />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-[#A5C8D6]/20 to-[#D9E4E0]/20 p-8 rounded-2xl border border-[#A5C8D6]"
        >
          <h3 className="text-2xl font-bold text-[#F0F4F8] mb-6 text-center">AI Lab Features & Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#A5C8D6]">AI Resume Analyzer</h4>
              <ul className="space-y-2 text-[#F0F4F8]">
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>NLP-based skill extraction using semantic analysis</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>Job-role similarity scoring with cosine similarity</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>Skill gap analysis and improvement suggestions</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>PDF text extraction and preprocessing</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#A5C8D6]">AI Portfolio Chatbot</h4>
              <ul className="space-y-2 text-[#F0F4F8]">
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>RAG (Retrieval Augmented Generation) pipeline</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>Semantic search with vector embeddings</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>Prompt engineering for contextual responses</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-[#A5C8D6] mt-1 mr-3 flex-shrink-0" />
                  <span>Context-aware conversational interface</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiLab;