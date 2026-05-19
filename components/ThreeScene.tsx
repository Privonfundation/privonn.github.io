
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AuroraMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#ffffff') },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec2 uResolution;
      varying vec2 vUv;

      float hash(vec2 n) { 
        return fract(sin(dot(n, vec2(123.45, 456.21))) * 43758.54); 
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        float res = mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        return res;
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.05;
        vec2 flowUv = vec2(uv.x, uv.y - t * 0.3);
        float n = noise(vec2(uv.x * 2.2 + sin(t * 0.2), uv.y * 0.25));
        float cut = smoothstep(0.1, 0.9, sin(uv.x * 5.0 + n * 2.5));
        float aurora = 0.0;
        aurora += noise(flowUv * 2.0 + n * 1.2);
        aurora += noise(flowUv * 3.0 - n * 1.5) * 0.3;
        float finalMask = pow(aurora, 2.5) * cut;
        float vFade = pow(uv.y, 3.5) * 1.0 + 0.05; 
        finalMask *= vFade;
        vec3 color = uColor;
        color.g *= 0.9 + 0.1 * sin(t + uv.x * 1.5);
        vec3 finalColor = color * finalMask * 0.4;
        float topGlow = smoothstep(0.5, 1.0, uv.y) * 0.2;
        float intensityGlow = smoothstep(0.15, 1.0, finalMask) * 0.15;
        finalColor += color * (intensityGlow + topGlow);
        float vig = smoothstep(2.5, 0.5, length(vUv - vec2(0.5, 1.3)));
        vig *= smoothstep(1.8, 0.2, length(vUv - vec2(0.5, 0.5)));
        finalColor *= vig;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        attach="material"
        args={[shaderArgs]} 
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const ThreeScene: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <AuroraMaterial />
      </Canvas>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
    </div>
  );
};
