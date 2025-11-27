'use client';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ position, height, color, date, count }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, hovered ? 1.5 : 1, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        position={[0, height / 2, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color={hovered ? '#fff' : color} />
      </mesh>
      {hovered && (
        <group position={[0, height + 1, 0]}>
          <Billboard>
            <Text fontSize={0.5} color="white" anchorX="center" anchorY="bottom">
              {`${count} commits\n${date}`}
            </Text>
          </Billboard>
        </group>
      )}
    </group>
  );
};

const GithubActivity = ({ username = 'skingford' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch real data
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        
        // Process data: flatten the contributions
        const contributions = json.contributions.flat();
        // Take last 30 days or so for better visualization, or aggregate by week
        // For 3D, showing 365 bars is a bit much for a small view, let's show last 3 months (approx 90 days)
        const recent = contributions.slice(-90);
        setData(recent);
      } catch (e) {
        console.error("Using mock data due to error:", e);
        // Mock data
        const mockData = Array.from({ length: 90 }, (_, i) => ({
          date: new Date(Date.now() - (89 - i) * 86400000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10),
          level: Math.floor(Math.random() * 5)
        }));
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const bars = useMemo(() => {
    return data.map((day, index) => {
      const x = (index % 15) * 1.2 - 8; // 15 columns
      const z = Math.floor(index / 15) * 1.2 - 4; // rows
      // Height based on count, min height 0.2
      const h = Math.max(0.2, day.count * 0.5);
      
      // Color based on count (GitHub greens)
      let color = '#161b22'; // empty
      if (day.count > 0) color = '#0e4429';
      if (day.count > 2) color = '#006d32';
      if (day.count > 5) color = '#26a641';
      if (day.count > 8) color = '#39d353';

      return (
        <Bar
          key={day.date}
          position={[x, 0, z]}
          height={h}
          color={color}
          date={day.date}
          count={day.count}
        />
      );
    });
  }, [data]);

  if (loading) return <div className="loading">Loading Activity...</div>;

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '300px' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
        <group position={[0, -2, 0]}>
          {bars}
        </group>
      </Canvas>
    </div>
  );
};

export default GithubActivity;
