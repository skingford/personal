'use client';
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Layout, Server, Globe, Database, Smartphone, Code } from 'lucide-react';
import './TechGalaxy.scss';

const TechGalaxy = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [bodies, setBodies] = useState([]);

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Layout, color: '#61dafb', x: 0, y: -200 },
    { id: 'backend', label: 'Backend', icon: Server, color: '#68a063', x: -200, y: 200 },
    { id: 'devops', label: 'DevOps', icon: Globe, color: '#e05d44', x: 200, y: 200 },
  ];

  const skills = [
    { name: 'React', category: 'frontend' },
    { name: 'Vue.js', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Tailwind', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Go', category: 'backend' },
    { name: 'GraphQL', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'Docker', category: 'devops' },
    { name: 'K8s', category: 'devops' },
    { name: 'AWS', category: 'devops' },
    { name: 'CI/CD', category: 'devops' },
    { name: 'Git', category: 'devops' },
  ];

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Events = Matter.Events;

    const engine = Engine.create();
    engine.world.gravity.y = 0; // No global gravity
    engineRef.current = engine;

    const newBodies = skills.map((skill) => {
      const category = categories.find((c) => c.id === skill.category);
      const body = Bodies.circle(
        category.x + (Math.random() - 0.5) * 100,
        category.y + (Math.random() - 0.5) * 100,
        30,
        {
          restitution: 0.9,
          frictionAir: 0.02,
          label: skill.name,
          plugin: { category: skill.category }, // Custom data
        }
      );
      return { body, data: skill };
    });

    World.add(engine.world, newBodies.map((b) => b.body));
    setBodies(newBodies);

    // Attractor logic
    Events.on(engine, 'beforeUpdate', () => {
      newBodies.forEach(({ body, data }) => {
        const category = categories.find((c) => c.id === data.category);
        const dx = category.x - body.position.x;
        const dy = category.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceMagnitude = 0.00005 * body.mass * distance; // Linear spring-like force

        Body.applyForce(body, body.position, {
          x: (dx / distance) * forceMagnitude,
          y: (dy / distance) * forceMagnitude,
        });
      });
    });

    const runner = setInterval(() => {
      Engine.update(engine, 1000 / 60);
      // Force update to re-render React components
      setBodies((prev) => [...prev]); 
    }, 1000 / 60);

    return () => {
      clearInterval(runner);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="tech-galaxy" style={{ position: 'relative', width: 800, height: 800 }}>
      {/* Central Cores */}
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="galaxy-core"
          style={{
            position: 'absolute',
            left: 400 + cat.x,
            top: 400 + cat.y,
            transform: 'translate(-50%, -50%)',
            color: cat.color,
          }}
        >
          <cat.icon size={48} />
          <span>{cat.label}</span>
        </div>
      ))}

      {/* Orbiting Skills */}
      {bodies.map(({ body, data }, index) => (
        <div
          key={index}
          className="skill-planet"
          style={{
            position: 'absolute',
            left: 400 + body.position.x,
            top: 400 + body.position.y,
            transform: `translate(-50%, -50%) rotate(${body.angle}rad)`,
          }}
        >
          {data.name}
        </div>
      ))}
    </div>
  );
};

export default TechGalaxy;
