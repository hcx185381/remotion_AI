import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

// 定义 Props 的 Schema
export const rotatingCubeSchema = z.object({
	cubeColor: z.string().default("#4a9eff"),
	cubeSize: z.number().min(1).max(5).default(3),
	rotationSpeed: z.number().min(0.005).max(0.1).step(0.005).default(0.02),
	metalness: z.number().min(0).max(1).step(0.1).default(0.5),
	roughness: z.number().min(0).max(1).step(0.1).default(0.1),
	pulseEffect: z.boolean().default(true),
	lightColor: z.string().default("#4a9eff"),
});

export type RotatingCubeProps = z.infer<typeof rotatingCubeSchema>;

/**
 * 3D 旋转立方体组件
 */
export const RotatingCube = ({
	cubeColor,
	cubeSize,
	rotationSpeed,
	metalness,
	roughness,
	pulseEffect,
	lightColor,
}: RotatingCubeProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas width={width} height={height}>
      {/* 环境光 - 提供基础照明 */}
      <ambientLight intensity={0.5} />

      {/* 方向光 - 模拟太阳光 */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 点光源 - 增加戏剧性效果 */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={lightColor} />

      {/* 旋转的立方体 */}
      <Cube
        rotationSpeed={rotationSpeed}
        cubeSize={cubeSize}
        cubeColor={cubeColor}
        metalness={metalness}
        roughness={roughness}
        pulseEffect={pulseEffect}
      />
    </ThreeCanvas>
  );
};

/**
 * 立方体组件
 */
const Cube = ({
	rotationSpeed,
	cubeSize,
	cubeColor,
	metalness,
	roughness,
	pulseEffect,
}: {
	rotationSpeed: number;
	cubeSize: number;
	cubeColor: string;
	metalness: number;
	roughness: number;
	pulseEffect: boolean;
}) => {
  const frame = useCurrentFrame();

  // 所有动画必须由 useCurrentFrame() 驱动
  const rotation = frame * rotationSpeed;

  // 添加缩放动画效果
  const scale = pulseEffect ? 1 + Math.sin(frame * 0.05) * 0.2 : 1;

  return (
    <mesh rotation={[rotation, rotation * 0.5, 0]} scale={scale}>
      {/* 立方体几何体 */}
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />

      {/* 标准材质 - 对光照有反应 */}
      <meshStandardMaterial
        color={cubeColor}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};
