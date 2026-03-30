"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Trail, Sphere, Sparkles } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const Entity = () => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const prevPos = useRef(new THREE.Vector3(0, 10, -5));
  const { viewport } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    // Responsive viewport handling for the 3D path
    const isMobile = window.innerWidth < 768;
    const xMult = isMobile ? 0.6 : 1;
    const w = viewport.width;
    const h = viewport.height;

    // Initial position (hidden at top right)
    gsap.set(groupRef.current.position, { x: w * 0.4, y: h * 0.6, z: -2 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Smooth scrubbing
      },
    });

    // Path animation (swimming gracefully down the page like the peachweb fish)
    tl.to(groupRef.current.position, { x: -w * 0.3 * xMult, y: h * 0.2, z: 2, ease: "sine.inOut" })
      .to(groupRef.current.position, { x: w * 0.3 * xMult, y: -h * 0.1, z: 0, ease: "sine.inOut" })
      .to(groupRef.current.position, { x: -w * 0.4 * xMult, y: -h * 0.5, z: 3, ease: "sine.inOut" })
      .to(groupRef.current.position, { x: w * 0.2 * xMult, y: -h * 0.8, z: -1, ease: "sine.inOut" })
      .to(groupRef.current.position, { x: 0, y: -h * 1.2, z: 2, ease: "sine.inOut" });

    return () => {
      tl.kill();
    };
  }, [viewport]);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    // Spin and pulsate the core to make it look "alive"
    innerRef.current.rotation.x += delta * 0.5;
    innerRef.current.rotation.y += delta * 0.8;

    // Auto-orient the entity along its movement path
    const currentPos = groupRef.current.position;
    const velocity = currentPos.clone().sub(prevPos.current);

    if (velocity.lengthSq() > 0.0001) {
      const targetLookAt = currentPos.clone().add(velocity);
      const dummy = new THREE.Object3D();
      dummy.position.copy(currentPos);
      dummy.lookAt(targetLookAt);

      // Smoothly rotate towards direction of travel
      groupRef.current.quaternion.slerp(dummy.quaternion, 0.08);
    }

    prevPos.current.copy(currentPos);
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        {/* Trail effect for the swimming motion */}
        <Trail
          width={3}
          length={20}
          color={new THREE.Color("#00f0ff")}
          attenuation={(t) => t * t}
        >
          <group>
            {/* The Sexy Liquid Metal AI Core */}
            <Sphere ref={innerRef} args={[0.6, 64, 64]}>
              <MeshDistortMaterial
                color="#050510"
                emissive="#0088ff"
                emissiveIntensity={0.8}
                distort={0.6}
                speed={4}
                roughness={0.1}
                metalness={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Sphere>
            {/* Orbital digital particles */}
            <Sparkles count={50} scale={2.5} size={2} speed={0.4} color="#ff00ff" />
          </group>
        </Trail>
      </Float>
    </group>
  );
};

export default function AIScrollEntity() {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={3} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <Entity />
      </Canvas>
    </div>
  );
}