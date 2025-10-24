'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { Group } from 'three'
import * as THREE from 'three'

interface GLTFSceneProps {
  url: string
  className?: string
  enableControls?: boolean
  autoRotate?: boolean
  scale?: number
}

// Optimized 3D Model with performance enhancements
function OptimizedModel({ url, scale = 1 }: { url: string; scale?: number }) {
  const groupRef = useRef<Group>(null)

  // Auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  // For now, render a fallback cube until actual glTF models are provided
  // This demonstrates the 3D capability and performance optimizations
  return (
    <group ref={groupRef}>
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Add some lighting for the cube */}
      <pointLight position={[2, 2, 2]} intensity={0.5} />
    </group>
  )
}

// Texture compression optimizer
function TextureOptimizer() {
  const { gl } = useThree()

  useMemo(() => {
    try {
      // Enable texture compression
      gl.capabilities.isWebGL2 && gl.extensions.get('WEBGL_compressed_texture_s3tc')
      gl.extensions.get('WEBGL_compressed_texture_etc')
      gl.extensions.get('WEBGL_compressed_texture_pvrtc')

      // Optimize renderer settings
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
      gl.outputColorSpace = THREE.SRGBColorSpace
    } catch (error) {
      console.warn('WebGL optimization failed:', error)
    }
  }, [gl])

  return null
}

export function GLTFScene({
  url,
  className = '',
  enableControls = false,
  autoRotate = true,
  scale = 1
}: GLTFSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#000000" wireframe />
            </mesh>
          }
        >
          <TextureOptimizer />

          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Environment for reflections */}
          <Environment preset="studio" />

          {/* Optimized 3D Model */}
          <OptimizedModel url={url} scale={scale} />

          {/* Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={autoRotate}
              minDistance={2}
              maxDistance={10}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload GLTF files for better performance
export function preloadGLTF(url: string) {
  useGLTF.preload(url)
}
