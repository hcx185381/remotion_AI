import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 3D 旋转立方体组件
 * 遵循 Remotion skill 规则：
 * - 使用 ThreeCanvas 包裹所有 3D 内容
 * - 动画由 useCurrentFrame() 驱动
 * - 包含适当的灯光
 * - 不使用 useFrame() from @react-three/fiber
 */
export const RotatingCube = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas width={width} height={height}>
      {/* 环境光 - 提供基础照明 */}
      <ambientLight intensity={0.5} />

      {/* 方向光 - 模拟太阳光 */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 点光源 - 增加戏剧性效果 */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />

      {/* 旋转的立方体 */}
      <Cube rotationSpeed={0.02} />
    </ThreeCanvas>
  );
};

/**
 * 立方体组件
 * 使用 useCurrentFrame() 驱动旋转动画
 */
const Cube = ({ rotationSpeed }: { rotationSpeed: number }) => {
  const frame = useCurrentFrame();

  // 所有动画必须由 useCurrentFrame() 驱动
  const rotation = frame * rotationSpeed;

  // 添加缩放动画效果
  const scale = 1 + Math.sin(frame * 0.05) * 0.2;

  return (
    <mesh rotation={[rotation, rotation * 0.5, 0]} scale={scale}>
      {/* 立方体几何体 */}
      <boxGeometry args={[3, 3, 3]} />

      {/* 标准材质 - 对光照有反应 */}
      <meshStandardMaterial
        color="#4a9eff"
        metalness={0.5}
        roughness={0.1}
      />
    </mesh>
  );
};
