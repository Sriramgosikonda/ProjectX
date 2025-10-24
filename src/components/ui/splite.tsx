'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Preload the Spline library
    const preloadSpline = async () => {
      try {
        await import('@splinetool/react-spline')
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to preload Spline:', error)
        setHasError(true)
      }
    }

    // Delay loading to prioritize initial render
    const timer = setTimeout(preloadSpline, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="text-2xl mb-4">🤖</div>
          <p>3D Scene temporarily unavailable</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => console.log('Spline scene loaded successfully')}
        onError={(error) => {
          console.error('Spline scene error:', error)
          setHasError(true)
        }}
      />
    </Suspense>
  )
}
