import React from "react";
import { Float, Splat } from "@react-three/drei";

const App: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Float rotationIntensity={2} floatIntensity={10} speed={2}>
        <Splat
          scale={2}
          position={[4, 3, 1]}
          rotation={[0, Math.PI / 2, 0]}
          src="https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat"
        />
      </Float>
    </>
  );
};

export default App;
