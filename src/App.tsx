import { Canvas } from "@react-three/fiber";
import {
  Preload,
  Lightformer,
  Environment,
  CameraControls,
  ContactShadows,
} from "@react-three/drei";

import GaussianShoe from "./components/GaussianShoe";
import GlbShoe from "./components/GlbShoe";
import Aquarium from "./components/Aquarium";

export default function App() {
  return (
    <Canvas
      dpr={[1.5, 2]}
      camera={{ position: [50, 5, -10], fov: 45, near: 1, far: 300 }}
    >
      <Aquarium position={[-0.1, 10.8, 3]} rotation={[Math.PI / 2, 0, 0]}>
        <GlbShoe />
      </Aquarium>
      <Aquarium position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <GaussianShoe />
      </Aquarium>
      {/** Environment (for reflections) */}
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        resolution={1024}
      >
        {/** On top of the HDRI we add some rectangular and circular shapes for nicer reflections */}
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <ContactShadows
        smooth={false}
        scale={100}
        position={[0, -5.05, 0]}
        blur={0.5}
        opacity={0.75}
      />
      <CameraControls
        makeDefault
        dollyToCursor
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <Preload all />
    </Canvas>
  );
}
