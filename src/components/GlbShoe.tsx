import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { Group } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const App: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Float rotationIntensity={2} floatIntensity={10} speed={2}>
        <GlbShoe />
      </Float>
    </>
  );
};

type GLTFResult = GLTF & {
  nodes: {
    [name: string]: THREE.Mesh;
  };
  materials: {
    [name: string]: THREE.Material;
  };
};

const GlbShoe = () => {
  const ref = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    "/shoe-draco.glb"
  ) as unknown as GLTFResult;
  return (
    <group
      ref={ref}
      scale={3}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color="orange"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color="red"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color="red"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color="orange"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color="white"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color="orange"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color="orange"
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color="orange"
      />
    </group>
  );
};

export default App;
