'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { GLTFScene } from '@/components/ui/gltf-scene'
import { Suspense, useState, useEffect } from 'react'

export default function ThankYouScreen() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 3
    }))
    setParticles(newParticles)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Optimized 3D Elements */}
      <div className="absolute inset-0 opacity-20">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        }>
          <GLTFScene
            url="/models/thank-you-optimized.glb"
            className="w-full h-full scale-50 opacity-30"
            scale={0.5}
            autoRotate={true}
          />
        </Suspense>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Success!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-300 mb-8 max-w-lg mx-auto"
          >
            Your calendar booking has been confirmed! We're excited to help you find your dream remote job.
          </motion.p>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">What's Next?</span>
            </div>
            <p className="text-gray-300 text-sm">
              Check your email for booking details and join our exclusive community of remote job seekers.
              We'll send you personalized job matches based on your preferences.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200"
            >
              Explore Job Matches
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Return to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
