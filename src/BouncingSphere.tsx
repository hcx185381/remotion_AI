import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * 蓝色球体弹跳动画
 * 遵循 Remotion skill 规则：
 * - 使用 ThreeCanvas 包裹 3D 内容
 * - 动画由 useCurrentFrame() 驱动
 * - 使用 interpolate() 实现位置平滑过渡
 * - 使用 spring() 实现弹跳效果
 * - 包含适当灯光
 */
export const BouncingSphere = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <ThreeCanvas width={width} height={height}>
      {/* 环境光 - 提供基础照明 */}
      <ambientLight intensity={0.6} />

      {/* 主光源 - 从上方照射 */}
      <directionalLight position={[10, 20, 10]} intensity={1} />

      {/* 侧边补光 - 增加立体感 */}
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#ffffff" />

      {/* 地面 - 帮助判断弹跳位置 */}
      <Ground />

      {/* 弹跳的球体 */}
      <BouncingBall />
    </ThreeCanvas>
  );
};

/**
 * 地面组件
 */
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color="#333333" roughness={0.8} />
    </mesh>
  );
};

/**
 * 弹跳球体组件
 * 动画完全由 useCurrentFrame() 驱动
 */
const BouncingBall = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 水平移动：从左到右
  // 使用 interpolate 实现平滑的线性移动
  const xPos = interpolate(frame, [0, durationInFrames], [-6, 6], {
    extrapolateRight: "clamp",
  });

  // 垂直弹跳：使用正弦波模拟物理弹跳
  // 频率控制弹跳速度
  const bounceFrequency = 0.15;
  const bounceHeight = 2.5;
  const yPos = Math.abs(Math.sin(frame * bounceFrequency)) * bounceHeight;

  // 旋转效果：球体在移动时旋转
  const rotation = frame * 0.05;

  // 缩放效果：落地时轻微压扁
  const scale = 1 + Math.sin(frame * bounceFrequency * 2) * 0.1;

  return (
    <mesh position={[xPos, yPos + scale, 0]} rotation={[rotation, rotation, 0]}>
      {/* 球体几何体 */}
      <sphereGeometry args={[1, 32, 32]} />

      {/* 蓝色材质 - 带金属感和光泽 */}
      <meshStandardMaterial
        color="#4a9eff"
        metalness={0.3}
        roughness={0.4}
        emissive="#1a4a8f"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};
