
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as THREE from 'three';

const RotatingBar = ({ position, height, color, label }: { 
  position: [number, number, number]; 
  height: number; 
  color: string;
  label: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, height + 0.3, 0]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(height * 100)}L
      </Text>
    </group>
  );
};

const Chart3D = () => {
  const chartData = [
    { name: 'John', value: 7.2, color: '#0088FE' },
    { name: 'Mary', value: 6.5, color: '#00C49F' },
    { name: 'Peter', value: 5.8, color: '#FFBB28' },
    { name: 'Grace', value: 6.95, color: '#FF8042' },
    { name: 'David', value: 4.45, color: '#8884D8' },
  ];

  return (
    <Card className="shadow-lg border-0 max-w-md mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-800 text-sm">
          3D Milk Production (Hundreds of Liters)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            
            {chartData.map((item, index) => (
              <RotatingBar
                key={item.name}
                position={[(index - 2) * 2, 0, 0]}
                height={item.value}
                color={item.color}
                label={item.name}
              />
            ))}
            
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={15}
            />
            
            {/* Grid floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[12, 8]} />
              <meshStandardMaterial color="#f0f9ff" transparent opacity={0.3} />
            </mesh>
          </Canvas>
        </div>
        <div className="mt-2 text-xs text-center text-gray-600">
          Drag to rotate • Scroll to zoom
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart3D;
