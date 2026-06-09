
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { TRANSLATIONS } from '../constants';

interface AppNodeProps {
  app: any;
  index: number;
  total: number;
  onHover: (id: string | null) => void;
  activeId: string | null;
}

const AppNode: React.FC<AppNodeProps> = ({ app, index, total, onHover, activeId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isActive = activeId === app.id;
  
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    if (!isActive) {
      meshRef.current.position.x = Math.cos(t * 0.5 + angle) * radius;
      meshRef.current.position.z = Math.sin(t * 0.5 + angle) * radius;
      meshRef.current.position.y = Math.sin(t * 1.2 + angle) * 0.5;
    } else {
      meshRef.current.position.lerp(new THREE.Vector3(0, 0, 1.5), 0.1);
    }
    
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(app.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          color={isActive ? "#ffffff" : "#ffffff"}
          speed={isActive ? 4 : 1}
          distort={isActive ? 0.6 : 0.3}
          opacity={isActive ? 1 : 0.5}
          transparent
          emissive={isActive ? "#ffffff" : "#000000"}
          emissiveIntensity={isActive ? 2 : 0}
        />
        
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.2}
          color={isActive ? "#ffffff" : "white"}
          fillOpacity={isActive ? 1 : 0.4}
        >
          {app.title.toUpperCase()}
        </Text>
      </mesh>
      
      {!isActive && (
        <Line
          points={[[0, 0, 0], [Math.cos(angle) * radius, 0, Math.sin(angle) * radius]]}
          color="#ffffff"
          lineWidth={0.5}
          opacity={0.1}
          transparent
        />
      )}
    </group>
  );
};

const Core = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#ffffff" wireframe />
      <pointLight intensity={2} color="#ffffff" />
    </mesh>
  );
};

const Scene = ({ lang, activeId, setActiveId }: { lang: 'ro' | 'en' | 'es', activeId: string | null, setActiveId: (id: string | null) => void }) => {
  const t = TRANSLATIONS[lang];
  return (
    <>
      <ambientLight intensity={0.5} />
      <Core />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {t.APPS.map((app, i) => (
          <AppNode 
            key={app.id} 
            app={app} 
            index={i} 
            total={t.APPS.length} 
            onHover={setActiveId}
            activeId={activeId}
          />
        ))}
      </Float>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={500}
              array={new Float32Array(Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 20))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.2} />
        </points>
      </mesh>
    </>
  );
};

export const OrbitalSystem: React.FC<{ lang: 'ro' | 'en' | 'es' }> = ({ lang }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = TRANSLATIONS[lang];
  const activeApp = t.APPS.find(a => a.id === activeId);

  return (
    <section id="the_vault" className="relative h-screen bg-black overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>
      
      <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${activeId ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-12 -translate-y-1/2 max-w-sm">
          <div className="border-l-2 border-[#ffffff] pl-6 py-4">
            <span className="text-[#ffffff] font-mono text-[10px] uppercase tracking-[0.5em] block mb-2">System_Output</span>
            <h3 className="text-5xl font-black tracking-tighter text-white mb-4">{activeApp?.title}</h3>
            <p className="text-white/60 font-mono text-sm leading-relaxed">{activeApp?.desc}</p>
          </div>
        </div>

        <div className="absolute top-1/2 right-12 -translate-y-1/2 text-right">
           <div className="flex flex-col items-end gap-2 mb-8">
             <span className="text-[10px] font-mono text-white/30 uppercase">Operational_Status</span>
             <span className="text-[#ffffff] font-mono text-xs font-bold animate-pulse">ACTIVE_REPLICATION</span>
           </div>
           <button className="pointer-events-auto px-10 py-4 border border-[#ffffff] text-[#ffffff] font-black uppercase text-[10px] tracking-widest hover:bg-[#ffffff] hover:text-black transition-all">
             Initialize_Module
           </button>
        </div>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-20">
        <h2 className="text-[10vw] font-black uppercase text-white tracking-tighter leading-none select-none outline-text">
          {t.APPS_SECTION_TITLE}
        </h2>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene lang={lang} activeId={activeId} setActiveId={setActiveId} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] animate-bounce">
        Interact_with_the_network_nodes
      </div>
    </section>
  );
};
