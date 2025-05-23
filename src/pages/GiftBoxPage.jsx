import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import GiftBoxModel from "../models/GiftBoxModel"; // صحح المسار حسب مشروعك

export default function GiftBoxPage() {
  const [modelPath, setModelPath] = useState("/models/box.glb");
  const [boxColor, setBoxColor] = useState("#9D0202");
  const [lidColor, setLidColor] = useState("#9D0202");
  const [ribbonColor, setRibbonColor] = useState("#C59E11");

  const boxOptions = [
  {
    name: "Box 1",
    path: "/models/box.glb",
    thumbnail: "/thumbnails/box1.PNG",
    defaults: {
      boxColor: "#9D0202",
      lidColor: "#9D0202",
      ribbonColor: "#C59E11"
    }
  },
  {
    name: "Box 2",
    path: "/models/box2.glb",
    thumbnail: "/thumbnails/box2.PNG",
    defaults: {
      boxColor: "#FFFFFF",
      lidColor: "#FFFFFF",
      ribbonColor: "#D82222"
    }
  },
  {
    name: "Box 3",
    path: "/models/box3.glb",
    thumbnail: "/thumbnails/box3.PNG",
    defaults: {
      boxColor: "#C81919",
      lidColor: "#C81919",
      ribbonColor: "#297906"
    }
  },
  {
    name: "Box 4",
    path: "/models/giftbox5.glb",
    thumbnail: "/thumbnails/box4.PNG",
    defaults: {
      boxColor: "#B22222",
      lidColor: "#21201C", // handle
      ribbonColor: "#21201C"
    }
  }
];


const lidSupportedModels = [
  "/models/box.glb",
  
  "/models/giftbox5.glb"
  
];
const isLidSupported = lidSupportedModels.includes(modelPath);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div style={{ padding: 20 }}>
        <label>
          🎁 <b>Box Color:</b><br />
          <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} />
        </label>
        <br /><br />

       {isLidSupported && (
  <>
    <label>
      📦 <b>{modelPath.includes("giftbox5.glb") ? "Handle Color" : "Lid Color"}:</b><br />
      <input
        type="color"
        value={lidColor}
        onChange={(e) => setLidColor(e.target.value)}
      />
      <br />
      <button onClick={() => setLidColor(boxColor)} style={{ marginTop: 8 }}>
        Match {modelPath.includes("giftbox5.glb") ? "Handle" : "Lid"} to Box
      </button>
    </label>
    <br /><br />
  </>
)}


        <br /><br />

        <label>
          🎀 <b>Ribbon Color:</b><br />
          <input type="color" value={ribbonColor} onChange={(e) => setRibbonColor(e.target.value)} />
        </label>

        <div style={{ marginTop: 20 }}>
  <p><b>Choose Gift Box Model:</b></p>
  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    {boxOptions.map((box, i) => (
      <img
        key={i}
        src={box.thumbnail}
        alt={box.name}
        onClick={() => {
  setModelPath(box.path);
  setBoxColor(box.defaults.boxColor);
  setLidColor(box.defaults.lidColor);
  setRibbonColor(box.defaults.ribbonColor);
}}

        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          cursor: "pointer",
          border: modelPath === box.path ? "3px solid #923A3A" : "1px solid #aaa",
          borderRadius: 8,
          boxShadow: modelPath === box.path ? "0 0 10px rgba(0,0,0,0.4)" : "none"
        }}
        title={box.name}
      />
    ))}
  </div>
</div>

      </div>

      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls  enableZoom={true}
  enablePan={true}
  enableRotate={true}
  maxPolarAngle={Math.PI}  // دوران كامل
  minPolarAngle={0}/>
          <GiftBoxModel
            modelPath={modelPath}
            boxColor={boxColor}
            lidColor={lidColor}
            ribbonColor={ribbonColor}
          />
        </Canvas>
      </div>
    </div>
  );
}
