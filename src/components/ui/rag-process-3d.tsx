'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GLTFScene } from './gltf-scene'

export function RAGProcess3D() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = useMemo(() => [
    {
      title: "User Query",
      description: "User enters a query or preference (like \"I want a data science mentor\" or \"Find my best project match\")",
      scene: "/models/user-query.glb" // 3D textbox or glowing input animation
    },
    {
      title: "Retrieval",
      description: "Retrieves the most relevant information using semantic search — beyond just keyword matching",
      scene: "/models/retrieval.glb" // Floating data blocks or nodes
    },
    {
      title: "Augmentation",
      description: "Retrieved information is sent to the AI model",
      scene: "/models/augmentation.glb" // Data flowing into neural network graphic
    },
    {
      title: "Generation",
      description: "The AI creates a personalized result (e.g., a recommendation, a project idea, or a match)",
      scene: "/models/generation.glb" // 3D card or tile popping up
    },
    {
      title: "AI-Powered Matching",
      description: "Our AI matches users with the most relevant opportunities using smart pattern recognition and personalized scoring",
      scene: "/models/matching.glb" // Personalized scoring visualization
    }
  ], [])

  // Auto-advance through steps for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000) // Change step every 3 seconds

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="w-full h-96 bg-black/50 rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">RAG Process Visualization</h3>

        {/* Step Navigation */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                currentStep === index
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={step.description}
            >
              {step.title}
            </motion.button>
          ))}
        </div>

        {/* Optimized GLTF Scene */}
        <div className="h-64 relative bg-black rounded-lg overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          }>
            <GLTFScene
              url={steps[currentStep].scene}
              className="w-full h-full"
              scale={0.8}
              autoRotate={true}
            />
          </Suspense>
          {/* Step indicator overlay */}
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step Description */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-4"
        >
          <p className="text-gray-300 text-sm leading-relaxed">{steps[currentStep].description}</p>
        </motion.div>
      </div>
    </div>
  )
}
