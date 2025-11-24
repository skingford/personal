'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, MeshDistortMaterial, useCursor, Html, CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import './SkillForest.scss';

const skills = [
  {
    id: 'react',
    name: 'React',
    color: '#61dafb',
    description: 'UI Library',
    projects: [
      { title: 'Portfolio v1', desc: 'Personal site with animations' },
      { title: 'Dashboard', desc: 'Admin panel for data viz' },
      { title: 'Social App', desc: 'Real-time feed & chat' }
    ],
    position: [-2, 0, 2]
  },
  {
    id: 'node',
    name: 'Node.js',
    color: '#68a063',
    description: 'Backend Runtime',
    projects: [
      { title: 'REST API', desc: 'Scalable microservices' },
      { title: 'WebSocket', desc: 'Real-time communication' },
      { title: 'CLI Tool', desc: 'Dev productivity scripts' }
    ],
    position: [2, 0, 0]
  },
  {
    id: 'three',
    name: 'Three.js',
    color: '#ffffff',
    description: '3D Graphics',
    projects: [
      { title: 'Skill Forest', desc: 'Interactive 3D demo' },
      { title: 'Product Config', desc: 'Car customizer' },
      { title: 'Game Proto', desc: 'Low-poly racer' }
    ],
    position: [0, 0, -2]
  },
  {
    id: 'python',
    name: 'Python',
    color: '#ffd343',
    description: 'Data & Scripting',
    projects: [
      { title: 'Scraper', desc: 'Data collection bot' },
      { title: 'ML Model', desc: 'Image classification' },
      { title: 'Automation', desc: 'Workflow scripts' }
    ],
    position: [-3, 0, -3]
  },
  {
    id: 'db',
    name: 'SQL',
    color: '#336791',
    description: 'Database',
    projects: [
      { title: 'Schema Design', desc: 'Normalized data models' },
      { title: 'Optimization', desc: 'Query performance tuning' }
    ],
    position: [3, 0, 3]
  }
];

const Tree = ({ position, color, name, description, projects, isFocused, onFocus }) => {
  const group = useRef();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  // Animation for "leaves" (projects)
  // When focused, we show the projects floating around the tree
  
  return (
    <group ref={group} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Tree Crown (The main interactive part) */}
        <mesh 
          onClick={(e) => { e.stopPropagation(); onFocus(); }}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          scale={isFocused ? 1.5 : 1}
        >
          <dodecahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial 
            color={color} 
            speed={2} 
            distort={hovered ? 0.4 : 0.1} 
            roughness={0.2}
          />
        </mesh>

        {/* Trunk */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.1, 0.2, 1.5, 8]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>

        {/* Label (Always visible or on hover) */}
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>

        {/* Hover Description Tooltip */}
        {hovered && !isFocused && (
          <Html position={[0, 2, 0]} center distanceFactor={10}>
            <div className="pointer-events-none bg-black/80 text-white p-2 rounded text-sm whitespace-nowrap backdrop-blur-sm border border-white/10">
              {description}
            </div>
          </Html>
        )}
      </Float>

      {/* Projects (Leaves) - Only visible when focused */}
      {isFocused && projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <group key={i} position={[x, 0, z]}>
            <Float speed={3} rotationIntensity={1} floatIntensity={1} timeOffset={i}>
              <mesh>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
              </mesh>
              <Html position={[0, 0.5, 0]} center distanceFactor={8}>
                <div className="bg-white/90 text-black p-2 rounded shadow-lg text-xs w-32 backdrop-blur-md">
                  <strong className="block border-b border-black/10 pb-1 mb-1">{project.title}</strong>
                  <span className="text-gray-600">{project.desc}</span>
                </div>
              </Html>
            </Float>
            {/* Connection line to tree */}
            <line>
              <bufferGeometry attach="geometry" onUpdate={self => {
                self.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-x, 0, -z)])
              }} />
              <lineBasicMaterial attach="material" color={color} transparent opacity={0.3} />
            </line>
          </group>
        );
      })}
    </group>
  );
};

const SkillForest = () => {
  const [focusedSkill, setFocusedSkill] = useState(null);
  const cameraControlsRef = useRef();
  const orbitControlsRef = useRef();

  const handleFocus = (skill, position) => {
    if (focusedSkill === skill.id) return; // Already focused
    setFocusedSkill(skill.id);
    
    // Disable OrbitControls to allow CameraControls to take over
    if (orbitControlsRef.current) orbitControlsRef.current.enabled = false;

    // Zoom camera to the tree
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        position[0] + 2, position[1] + 1, position[2] + 2, // Camera position (closer)
        position[0], position[1], position[2], // Target position
        true // Transition
      );
    }
  };

  const handleReset = () => {
    setFocusedSkill(null);
    
    // Re-enable OrbitControls after transition
    // We use a timeout to match the transition duration roughly, or just enable it immediately
    // but CameraControls might fight it. 
    // Better: Use CameraControls for everything or switch modes.
    // For simplicity, we'll re-enable after a short delay or immediately.
    if (orbitControlsRef.current) orbitControlsRef.current.enabled = true;

    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        0, 5, 10, // Default camera pos
        0, 0, 0, // Default target
        true
      );
    }
  };

  return (
    <div className="skill-forest-container">
      <div className="ui-overlay">
        <div className="header-info">
          <h1>Skill Forest</h1>
          <p>Drag to rotate • Click a tree to explore</p>
        </div>
        
        {focusedSkill && (
          <button 
            onClick={handleReset}
            className="back-button"
          >
            ← Back to Forest
          </button>
        )}
      </div>

      <div className="canvas-wrapper">
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <fog attach="fog" args={['#111', 10, 40]} />
          
          {/* Improved Lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={1} color="#4444ff" />
          <pointLight position={[10, -5, 10]} intensity={1} color="#ff4444" />
          
          <group>
            {skills.map((skill) => (
              <Tree 
                key={skill.id} 
                {...skill} 
                isFocused={focusedSkill === skill.id}
                onFocus={() => handleFocus(skill, skill.position)}
              />
            ))}
            
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.5} />
              <gridHelper args={[100, 50, '#444', '#222']} rotation={[-Math.PI/2, 0, 0]} />
            </mesh>
          </group>

          <OrbitControls 
            ref={orbitControlsRef}
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2} 
            enableZoom={!focusedSkill} // Disable zoom when focused
            enablePan={!focusedSkill}
            enabled={!focusedSkill} // Disable entirely when focused to avoid conflicts
          />
          <CameraControls ref={cameraControlsRef} />
        </Canvas>
      </div>
    </div>
  );
};

export default SkillForest;
