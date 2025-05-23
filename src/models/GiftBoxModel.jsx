import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function GiftBoxModel({ modelPath, boxColor, lidColor, ribbonColor }) {
  const { scene } = useGLTF(modelPath, true); // ✅ force reload if path changes
  

  
  const model = useMemo(() => {
    if (!scene) return null;

    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();
      console.log("🧩 part:", name);

      if (name.includes("plane") || name.includes("camera") || name.includes("light")) {
        child.parent?.remove(child);
        return;
      }

     

      // 🎁 Box 1
      else if (modelPath.includes("box.glb")) {
        if (name === "node1") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(ribbonColor) });
        } else if (name === "node2") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(boxColor) });
        } else if (name === "node3") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(lidColor) });
        }
      }

      // 🎁 Box 2
      else if (modelPath.includes("box2.glb")) {
        if (name === "node1") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(boxColor) });
        } else if (name === "node2") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(ribbonColor) });
        }
      }

      // 🎁 Box 3
      else if (modelPath.includes("box3.glb")) {
        if (name === "node2") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(ribbonColor) });
        } else if (name === "node1") {
          child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(boxColor) });
        }
      }
      // 🎁 Box 4 - giftbox5.glb
else if (modelPath.includes("giftbox5.glb")) {
  if (name === "node1" || name === "node4") {
    child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color( boxColor) });
  } else if (name === "node2") {
    child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(lidColor) });
  } else if (name === "node3") {
    child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color( ribbonColor) });
  }
}



    });

    return cloned;
  }, [scene, modelPath, boxColor, lidColor, ribbonColor]);

  return model ? <primitive object={model} scale={
    modelPath.includes("giftbox5.glb")
        ? 0.18 // ✅ Scale خاص فقط بـ Box 5
        : 0.13} position={[0, 0, 0]} /> : null;
}

export default GiftBoxModel;
