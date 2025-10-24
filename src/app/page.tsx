"use client";

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import "@/components/ui/canvas";
import { Calendar } from "@/components/ui/calendar";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { Button } from "@/components/ui/button";
import { Home, Zap, Users, MessageCircle, Mail, ArrowRight, Check } from "lucide-react";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load heavy components with intersection observer
const AnimatedTestimonials = dynamic(() => import("@/components/ui/animated-testimonials-fixed").then(mod => ({ default: mod.AnimatedTestimonials })), {
  loading: () => <div className="h-96 bg-black/20 rounded-lg animate-pulse" />
});

const DatabaseWithRestApi = dynamic(() => import("@/components/ui/database-with-rest-api"), {
  loading: () => <div className="h-64 bg-black/20 rounded-lg animate-pulse" />
});

const ShuffleHero = dynamic(() => import("@/components/ui/shuffle-grid").then(mod => ({ default: mod.ShuffleHero })), {
  loading: () => <div className="h-96 bg-black/20 rounded-lg animate-pulse" />
});

const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => ({ default: mod.ContainerScroll })), {
  loading: () => <div className="h-64 bg-black/20 rounded-lg animate-pulse" />
});

const InteractiveSelector = dynamic(() => import("@/components/ui/interactive-selector"), {
  loading: () => <div className="h-96 bg-black/20 rounded-lg animate-pulse" />
});

const SplineSceneBasic = dynamic(() => import("@/components/ui/demo").then(mod => ({ default: mod.SplineSceneBasic })), {
  loading: () => <div className="h-screen bg-black flex items-center justify-center"><div className="text-white">Loading 3D Scene...</div></div>,
  ssr: false
});

const WaveDemo = dynamic(() => import("@/components/ui/wave-demo"), {
  loading: () => <div className="h-64 bg-black/20 rounded-lg animate-pulse" />
});

const RAGProcess3D = dynamic(() => import("@/components/ui/rag-process-3d").then(mod => ({ default: mod.RAGProcess3D })), {
  loading: () => <div className="h-96 bg-black/20 rounded-lg animate-pulse" />,
  ssr: false
});

export default function HomePage() {
  const router = useRouter();
  const [isSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: "",
    remoteOnly: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // Reduced from 5s to 3s for faster LCP

    return () => clearTimeout(timer);
  }, []);

  // Initialize canvas immediately for faster render
  useEffect(() => {
    const initCanvas = () => {
      if (typeof window !== 'undefined' && (window as any).renderInteractiveCanvas) {
        (window as any).renderInteractiveCanvas();
      }
    };

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(initCanvas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/processing");
  };

  const jobRoles = [
    "Full Stack Engineer",
    "Frontend Developer", 
    "Backend Developer",
    "DevOps Engineer",
    "Data Engineer",
    "Mobile Developer",
    "UI/UX Designer",
    "Product Manager",
    "Other"
  ];

  const testimonials = [
    {
      quote: "RemoteFlow helped me land a remote role at a top startup! The AI matching was spot-on and I found my dream job in just 2 weeks.",
      name: "Sarah Chen",
      designation: "Full Stack Developer at TechCorp",
      src: "👩‍💻",
    },
    {
      quote: "I've tried every job board out there, but RemoteFlow is in a league of its own. The personalized recommendations actually understand my skills.",
      name: "Marcus Rodriguez", 
      designation: "Senior Frontend Engineer at InnovateLab",
      src: "👨‍💻",
    },
    {
      quote: "The remote job market can be overwhelming, but RemoteFlow made it simple. I love how they verify companies and only show legitimate remote positions.",
      name: "Emily Johnson",
      designation: "Backend Developer at CloudScale", 
      src: "👩‍🔬",
    },
  ];


  return (
    <>
      {/* Intro Screen with ParticleTextEffect */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <div className="w-full h-full">
              <ParticleTextEffect words={["Welcome to", "RemoteFlow", "Elite Job Platform"]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-black text-white">
        {/* Dock Navigation */}
        {!showIntro && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
            <Dock className="bg-black/80 backdrop-blur-md border border-white/10">
              <DockItem>
                <DockIcon>
                  <Home className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Home</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <Zap className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Features</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <Users className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Waitlist</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <MessageCircle className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Testimonials</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <Mail className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Contact</DockLabel>
              </DockItem>
            </Dock>
          </div>
        )}

        {/* Hero Section with 3D Robot - Full Screen */}
        {!showIntro && (
          <section id="home" className="h-screen w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />

            {/* Canvas Background - Load immediately for LCP */}
            <canvas
              id="canvas"
              className="absolute inset-0 w-full h-full"
              style={{ background: 'black' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} // Faster animation for better LCP
              className="w-full h-full relative z-10"
            >
              <SplineSceneBasic />
            </motion.div>
          </section>
        )}

        {/* How It Works - Unified AI-Powered Platform */}
        {!showIntro && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white hover:text-gray-200 transition-colors duration-300">
                  How It Works
                </h2>
                <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                  Our advanced <span title="Retrieval-Augmented Generation: AI system that retrieves relevant data and generates personalized recommendations">RAG-powered</span> platform intelligently scrapes, analyzes, and matches you with the perfect remote opportunities.
                </p>
              </motion.div>

              <div id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Data Processing Pipeline */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Intelligent Data Pipeline
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Our system continuously monitors thousands of job sources, processing millions of listings through advanced AI algorithms to surface only the highest-quality remote opportunities.
                    </p>
                  </motion.div>

                  <DatabaseWithRestApi />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-8 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">Real-time Scraping</h4>
                        <p className="text-gray-400 text-sm">Continuous monitoring of job boards, company career pages, and recruitment platforms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">AI-Powered Analysis</h4>
                        <p className="text-gray-400 text-sm">Machine learning algorithms filter and categorize opportunities based on role requirements and company credibility</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold">Quality Verification</h4>
                        <p className="text-gray-400 text-sm">Only verified companies and legitimate remote positions make it through our rigorous validation process</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* RAG Process & AI Matching */}
                <div className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      RAG-Powered Matching Engine
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Our <span title="Retrieval-Augmented Generation combines information retrieval with generative AI for more accurate and contextual recommendations">Retrieval-Augmented Generation</span> system goes beyond simple keyword matching to understand context, culture, and career goals.
                    </p>
                  </motion.div>

                  {/* RAG 3D Visualization */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <RAGProcess3D />
                  </motion.div>

                  {/* AI Matching Details */}
                  <ContainerScroll
                    titleComponent={
                      <h3 className="text-xl font-bold text-center mb-4 text-white">
                        Personalized Recommendations
                      </h3>
                    }
                  >
                    <div className="bg-black/50 rounded-2xl p-6 border border-white/10">
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                            Each recommendation is personalized using your unique profile, preferences, and career trajectory to ensure perfect alignment.
                          </p>
                          <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Skill-based matching with growth potential analysis</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Company culture and values alignment scoring</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Work-life balance and remote work policy evaluation</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span>Salary optimization based on experience and location</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/5">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-white mb-1">94%</div>
                              <div className="text-xs text-gray-400">Job Match</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white mb-1">100%</div>
                              <div className="text-xs text-gray-400">Remote Fit</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white mb-1">89%</div>
                              <div className="text-xs text-gray-400">Culture Match</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ContainerScroll>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Companies We Track */}
        {!showIntro && (
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white hover:text-gray-200 transition-colors duration-300">
                  Companies We Track
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  We actively scrape job listings from top tech companies and startups, ensuring you never miss an opportunity from industry leaders.
                </p>
              </motion.div>
              
              <Suspense fallback={<div className="h-96 bg-black/20 rounded-lg animate-pulse" />}>
                <ShuffleHero />
              </Suspense>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {!showIntro && (
          <section id="testimonials" className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white hover:text-gray-200 transition-colors duration-300">
                  What Developers Say
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Don&apos;t just take our word for it. Here&apos;s what real developers are saying about RemoteFlow.
                </p>
              </motion.div>

              <Suspense fallback={<div className="h-96 bg-black/20 rounded-lg animate-pulse" />}>
                <AnimatedTestimonials testimonials={testimonials} />
              </Suspense>
            </div>
          </section>
        )}

        {/* Calendar + Waitlist Combined */}
        {!showIntro && (
          <section id="waitlist" className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white hover:text-gray-200 transition-colors duration-300">
                  Join The Waitlist
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Be among the first to experience RemoteFlow. Reserve your spot today and get early access.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div className="w-full flex justify-center order-2 lg:order-1">
                  <div className="bg-black rounded-2xl p-6 border border-white/10 shadow-2xl transform scale-95 hover:scale-100 transition-transform duration-300">
                    <Calendar />
                    <div className="mt-6 flex justify-center">
                      <Button onClick={() => router.push('/processing')} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200">
                        Book a Demo
                      </Button>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="w-full order-1 lg:order-2"
                >
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-md mx-auto text-center"
                    >
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-black" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        You&apos;re in! 🎉
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Get ready to code remotely like a pro! We&apos;ll notify you when RemoteFlow launches.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md mx-auto hover:shadow-3xl transition-shadow duration-300">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                          placeholder="your.email@example.com"
                          required
                        />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Role
                          </label>
                        <select
                          value={formData.jobRole}
                          onChange={(e) => setFormData({...formData, jobRole: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                          required
                          title="Select your job role"
                        >
                          <option value="">Select your role</option>
                          {jobRoles.map((role) => (
                            <option key={role} value={role} className="bg-black">
                              {role}
                            </option>
                          ))}
                        </select>
                        </div>

                        <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="remoteOnly"
                          checked={formData.remoteOnly}
                          onChange={(e) => setFormData({...formData, remoteOnly: e.target.checked})}
                          className="w-5 h-5 text-white bg-white/5 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                        />
                          <label htmlFor="remoteOnly" className="text-sm text-gray-300">
                            I&apos;m only interested in remote positions
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-white text-black py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-200 shadow-lg"
                        >
                          Reserve My Spot!
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </form>

                      <p className="text-center text-sm text-gray-400 mt-6">
                        Join 2,500+ developers already on the waitlist
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Other Projects */}
        {!showIntro && (
          <section className="py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                  Other Tools We&apos;re Building
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Explore our upcoming projects designed for developers.
                </p>
              </motion.div>

              <Suspense fallback={<div className="h-96 bg-black/20 rounded-lg animate-pulse" />}>
                <InteractiveSelector />
              </Suspense>
            </div>
          </section>
        )}

        {/* Wave Section with Footer Content Below */}
        {!showIntro && (
          <section className="relative overflow-hidden bg-black">
            <Suspense fallback={<div className="h-64 bg-black/20 rounded-lg animate-pulse" />}>
              <WaveDemo />
            </Suspense>
            
            {/* Footer Content Below Wave */}
            <div className="pb-12 relative bg-black">
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      RemoteFlow
                    </h3>
                    <p className="text-gray-400 text-sm">
                      The ultimate platform for remote job seekers in the IT industry.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                      <li><a href="#waitlist" className="hover:text-white transition-colors">Join Waitlist</a></li>
                      <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Email: hello@remoteflow.com</p>
                      <p>Twitter: @RemoteFlow</p>
                      <p>LinkedIn: RemoteFlow</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
                  <p>&copy; 2024 RemoteFlow. All rights reserved. Built with Next.js and Tailwind CSS.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}