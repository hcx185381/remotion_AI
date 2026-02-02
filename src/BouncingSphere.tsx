import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { z } from "zod";

// 定义 Props 的 Schema
export const bouncingSphereSchema = z.object({
	ballColor: z.string().default("#4a9eff"),
	ballSize: z.number().min(0.5).max(3).step(0.1).default(1),
	bounceHeight: z.number().min(1).max(5).step(0.5).default(2.5),
	bounceFrequency: z.number().min(0.05).max(0.3).step(0.01).default(0.15),
	groundColor: z.string().default("#333333"),
	metalness: z.number().min(0).max(1).step(0.1).default(0.3),
	roughness: z.number().min(0).max(1).step(0.1).default(0.4),
	emissiveColor: z.string().default("#1a4a8f"),
	squashEffect: z.boolean().default(true),
});

export type BouncingSphereProps = z.infer<typeof bouncingSphereSchema>;

/**
 * 蓝色球体弹跳动画
 */
export const BouncingSphere = ({
	ballColor,
	ballSize,
	bounceHeight,
	bounceFrequency,
	groundColor,
	metalness,
	roughness,
	emissiveColor,
	squashEffect,
}: BouncingSphereProps) => {
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
      <Ground groundColor={groundColor} />

      {/* 弹跳的球体 */}
      <BouncingBall
        ballColor={ballColor}
        ballSize={ballSize}
        bounceHeight={bounceHeight}
        bounceFrequency={bounceFrequency}
        metalness={metalness}
        roughness={roughness}
        emissiveColor={emissiveColor}
        squashEffect={squashEffect}
      />
    </ThreeCanvas>
  );
};

/**
 * 地面组件
 */
const Ground = ({ groundColor }: { groundColor: string }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color={groundColor} roughness={0.8} />
    </mesh>
  );
};

/**
 * 弹跳球体组件
 */
const BouncingBall = ({
	ballColor,
	ballSize,
	bounceHeight,
	bounceFrequency,
	metalness,
	roughness,
	emissiveColor,
	squashEffect,
}: {
	ballColor: string;
	ballSize: number;
	bounceHeight: number;
	bounceFrequency: number;
	metalness: number;
	roughness: number;
	emissiveColor: string;
	squashEffect: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 水平移动：从左到右
  const xPos = interpolate(frame, [0, durationInFrames], [-6, 6], {
    extrapolateRight: "clamp",
  });

  // 垂直弹跳：使用正弦波模拟物理弹跳
  const yPos = Math.abs(Math.sin(frame * bounceFrequency)) * bounceHeight;

  // 旋转效果：球体在移动时旋转
  const rotation = frame * 0.05;

  // 缩放效果：落地时轻微压扁
  const scale = squashEffect ? 1 + Math.sin(frame * bounceFrequency * 2) * 0.1 : 1;

  return (
    <mesh position={[xPos, yPos + scale, 0]} rotation={[rotation, rotation, 0]}>
      {/* 球体几何体 */}
      <sphereGeometry args={[ballSize, 32, 32]} />

      {/* 蓝色材质 - 带金属感和光泽 */}
      <meshStandardMaterial
        color={ballColor}
        metalness={metalness}
        roughness={roughness}
        emissive={emissiveColor}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};
