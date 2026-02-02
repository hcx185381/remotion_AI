import { useRef } from "react";
import { useCurrentFrame } from "remotion";
import { getCameraAnimation } from "../utils/sceneAnimations";

/**
 * 高精细度运动相机 3D 模型
 */
export const CameraModel = ({
  frame,
  sceneIndex,
  cameraColor = "#1a1a1a",
}: {
  frame: number;
  sceneIndex: number;
  cameraColor?: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // 获取当前场景的动画参数
  const animation = getCameraAnimation(frame, sceneIndex);

  // 屏幕发光效果（场景6增强）
  const screenGlow =
    sceneIndex === 5
      ? Math.sin(frame * 0.1) * 0.3 + 0.5
      : sceneIndex === 5
      ? 0.8
      : 0.3;

  return (
    <group
      ref={groupRef}
      position={[animation.x, animation.y, animation.z]}
      rotation={[
        animation.rotationX,
        animation.rotationY,
        animation.rotationZ,
      ]}
      scale={animation.scale}
    >
      {/* 1. 主机身 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3.5, 0.8]} />
        <meshStandardMaterial
          color={cameraColor}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* 2. 前面板（略突起） */}
      <mesh position={[0, 0, 0.45]}>
        <boxGeometry args={[1.85, 3.35, 0.12]} />
        <meshStandardMaterial color="#0f0f0f" metalness={1} roughness={0.1} />
      </mesh>

      {/* 3. 镜头组件 */}
      <LensAssembly frame={frame} sceneIndex={sceneIndex} />

      {/* 4. 后屏幕 */}
      <mesh position={[0, 0.3, -0.41]}>
        <planeGeometry args={[1.6, 2]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 屏幕显示内容 */}
      <mesh position={[0, 0.3, -0.405]}>
        <planeGeometry args={[1.5, 1.9]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={screenGlow}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 5. 顶部按钮 */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#ff3333" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0.5, 1.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 6. 侧边接口 */}
      <group position={[1.05, 0, 0]}>
        {/* USB-C */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.08, 0.3, 0.15]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* HDMI */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.08, 0.2, 0.12]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 7. 底部支架接口 */}
      <mesh position={[0, -1.8, -0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 6]} />
        <meshStandardMaterial color="#333333" metalness={0.95} roughness={0.05} />
      </mesh>

      <mesh position={[0, -1.85, -0.2]}>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 8. 前面板装饰线 */}
      <mesh position={[0, 1.3, 0.41]}>
        <boxGeometry args={[1.2, 0.02, 0.01]} />
        <meshStandardMaterial color="#444444" metalness={1} roughness={0.1} />
      </mesh>

      {/* 品牌标识 */}
      <mesh position={[0, -0.8, 0.41]}>
        <planeGeometry args={[0.8, 0.15]} />
        <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};

/**
 * 镜头组件（高精细度）
 */
const LensAssembly = ({
  frame,
  sceneIndex,
}: {
  frame: number;
  sceneIndex: number;
}) => {
  // 镜头反光效果（场景3增强）
  const lensFlareIntensity =
    sceneIndex === 2 ? Math.sin(frame * 0.05) * 0.5 + 0.5 : 0.2;

  return (
    <group position={[0, 0.8, 0.5]}>
      {/* 镜头外圈 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 镜头内圈 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial
          color="#050505"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* 镜片（多层反射） */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={0.95}
          thickness={0.1}
          ior={1.5}
          clearcoat={1}
        />
      </mesh>

      {/* 镜头镀膜效果 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.13]}>
        <circleGeometry args={[0.48, 32]} />
        <meshStandardMaterial
          color="#4488ff"
          emissive="#2266dd"
          emissiveIntensity={lensFlareIntensity}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 镜头边缘反光环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#888888"
          metalness={1}
          roughness={0.1}
          emissive="#aaaaaa"
          emissiveIntensity={lensFlareIntensity * 0.3}
        />
      </mesh>
    </group>
  );
};
