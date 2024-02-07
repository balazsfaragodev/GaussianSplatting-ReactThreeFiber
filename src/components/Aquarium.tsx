import { useLayoutEffect, useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, useMask } from "@react-three/drei";

import { Group, Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type AquariumProps = JSX.IntrinsicElements["group"] & {
  children: React.ReactNode;
};
interface GLTFResult extends GLTF {
  nodes: {
    [name: string]: THREE.Mesh;
  };
  animations: THREE.AnimationClip[];
}

const Aquarium: React.FC<AquariumProps> = ({ children, ...props }) => {
  const ref = useRef<Group>(null);
  const { nodes } = useGLTF("/shapes-transformed.glb") as unknown as GLTFResult;
  const stencil = useMask(1, false);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.traverse((child: THREE.Object3D) => {
        if ((child as Mesh).isMesh) {
          // Now TypeScript knows 'child' is a Mesh, so 'child.material' is safe to access
          const mesh = child as Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) =>
              Object.assign(material, stencil)
            );
          } else {
            Object.assign(mesh.material, stencil);
          }
        }
      });
    }
  }, [stencil]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        scale={[0.61 * 6, 0.8 * 6, 1 * 6]}
        geometry={nodes.Cube.geometry}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
};

export default Aquarium;
