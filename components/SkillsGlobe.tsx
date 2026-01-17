'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

interface SkillsGlobeProps {
  skills: Skill[];
}

const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ skills }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  
  // Convert spherical coordinates to Cartesian coordinates
  const getSpherePosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    // Vary the radius to create different distances from center
    const baseRadius = 4;
    const variedRadius = baseRadius * (0.9 + 0.2 * Math.sin(index)); // Vary between 0.9 and 1.1 of base
    const x = variedRadius * Math.cos(theta) * Math.sin(phi);
    const y = variedRadius * Math.sin(theta) * Math.sin(phi);
    const z = variedRadius * Math.cos(phi);
    
    return { x, y, z };
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>
      
      {/* Skill nodes with connecting lines */}
      {skills.map((skill, index) => {
        const position = getSpherePosition(index, skills.length);
        
        // Create a line from center to the skill position
        const lineLength = Math.sqrt(position.x * position.x + position.y * position.y + position.z * position.z);
        
        // Calculate direction vector for the line
        const direction = new THREE.Vector3(position.x, position.y, position.z).normalize();
        
        return (
          <group key={skill.id}>
            {/* Connecting line */}
            <line>
              <bufferGeometry>
                <bufferGeometry ref={(geom) => {
                  if (geom) {
                    const pos = new Float32Array([0, 0, 0, position.x, position.y, position.z]);
                    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                  }
                }} />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#ffffff" // Changed to white for maximum visibility
                transparent={true}
                opacity={0.9}
                linewidth={1.0 + (index % 3) * 0.5} // Different line widths
              />
            </line>
            
            {/* Skill sphere at the end of the line */}
            <group position={[position.x, position.y, position.z]}>
              <mesh
                onPointerOver={() => setHoveredSkill(skill)}
                onPointerOut={() => setHoveredSkill(null)}
              >
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  transparent={true}
                  opacity={0.3}
                  emissive="#ffffff"
                  emissiveIntensity={0.5}
                  roughness={0.1}
                  metalness={0.1}
                />
              </mesh>
              
              {/* Skill label inside the sphere */}
              <Text
                position={[0, 0, 0]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>
            </group>
          </group>
        );
      })}
      
      {/* Additional ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
    </group>
  );
};

const SkillsGlobeContainer: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="w-full h-96 md:h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <SkillsGlobe skills={skills} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default SkillsGlobeContainer;