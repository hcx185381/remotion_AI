import { ThreeCanvas } from "@remotion/three";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";
import { useRef } from "react";
import * as THREE from "three";

/**
 * 苹果风格产品展示动画
 * 遵循 Remotion skill 规则：
 * - 使用 ThreeCanvas 包裹 3D 内容
 * - 所有动画由 useCurrentFrame() 驱动
 * - 包含多层光照、反射、粒子效果
 */
export const ProductShowcase = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <ThreeCanvas width={width} height={height}>
        {/* 多层光照系统 */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#667eea" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#ffffff"
        />

        {/* 主产品 */}
        <ProductDevice frame={frame} />

        {/* 粒子效果 */}
        <ParticleSystem frame={frame} />

        {/* 环形元素 */}
        <RingAnimation frame={frame} />

        {/* 相机动画组 */}
        <CameraRig frame={frame} />
      </ThreeCanvas>

      {/* 2D UI 叠加层 */}
      <UILayer frame={frame} />
    </AbsoluteFill>
  );
};

/**
 * 3D 设备产品（类似 iPhone）
 */
const ProductDevice = ({ frame }: { frame: number }) => {
  const deviceRef = useRef<THREE.Mesh>(null);

  // 产品旋转动画 - 使用 spring 实现弹性效果
  const rotationY = spring({
    frame: frame - 30,
    fps: 30,
    config: {
      damping: 100,
      stiffness: 50,
      mass: 1,
    },
  });

  // 产品浮起动画
  const positionY = interpolate(frame, [0, 60, 120], [-2, 0, 0], {
    extrapolateRight: "clamp",
  });

  // 产品缩放入场
  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 80,
      stiffness: 100,
    },
  });

  // 产品倾斜动画
  const rotationX = Math.sin(frame * 0.02) * 0.1;

  return (
    <group
      rotation={[rotationX, rotationY * Math.PI * 2, 0]}
      position={[0, positionY, 0]}
      scale={scale}
    >
      {/* 设备主体 */}
      <mesh ref={deviceRef}>
        <boxGeometry args={[3, 6, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* 屏幕显示 */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[2.8, 5.8]} />
        <meshStandardMaterial
          color="#667eea"
          metalness={0.1}
          roughness={0.2}
          emissive="#667eea"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 设备边框 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.1, 6.1, 0.28]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* 摄像头模块 */}
      <mesh position={[0, 2.5, 0.2]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 侧边按钮 */}
      <mesh position={[1.6, 1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.6, -1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 相机动画组
 */
const CameraRig = ({ frame }: { frame: number }) => {
  // 相机轨道运动
  const cameraAngle = interpolate(frame, [0, 300], [0, Math.PI * 2], {
    extrapolateRight: "loop",
  });

  const cameraRadius = 12;
  const cameraHeight = 3 + Math.sin(frame * 0.03) * 2;

  const x = Math.sin(cameraAngle) * cameraRadius;
  const z = Math.cos(cameraAngle) * cameraRadius;

  return (
    <group position={[x * 0.3, cameraHeight * 0.2, z * 0.3]}>
      <perspectiveCamera position={[0, 0, 12]} fov={50} />
    </group>
  );
};

/**
 * 粒子系统
 */
const ParticleSystem = ({ frame }: { frame: number }) => {
  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 6 + Math.sin(frame * 0.02 + i) * 0.5;
    const y = Math.sin(frame * 0.03 + i * 0.1) * 3;
    const x = Math.cos(angle + frame * 0.01) * radius;
    const z = Math.sin(angle + frame * 0.01) * radius;

    const scale = (Math.sin(frame * 0.05 + i) + 1) * 0.5 + 0.5;

    particles.push(
      <mesh key={i} position={[x, y, z]} scale={scale}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#667eea"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    );
  }

  return <>{particles}</>;
};

/**
 * 环形动画元素
 */
const RingAnimation = ({ frame }: { frame: number }) => {
  const rings = [];

  for (let i = 0; i < 5; i++) {
    const rotation = frame * 0.02 * (i % 2 === 0 ? 1 : -1);
    const scale = 1 + i * 0.3;
    const opacity = interpolate(frame, [i * 20, i * 20 + 30], [0, 0.3], {
      extrapolateRight: "clamp",
    });

    rings.push(
      <mesh
        key={i}
        rotation={[Math.PI / 2, rotation, 0]}
        scale={scale}
        position={[0, -3, -2]}
      >
        <torusGeometry args={[4 + i * 0.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#764ba2"
          emissiveIntensity={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>
    );
  }

  return <>{rings}</>;
};

/**
 * 2D UI 叠加层
 */
const UILayer = ({ frame }: { frame: number }) => {
  // 标题动画
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateRight: "clamp",
  });

  // 副标题动画
  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 特性标签动画
  const featuresOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          fontSize: 120,
          fontWeight: "bold",
          color: "white",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 10px 40px rgba(0,0,0,0.3)",
          letterSpacing: "-2px",
        }}
      >
        PRO
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 48,
          color: "rgba(255,255,255,0.9)",
          opacity: subtitleOpacity,
          marginTop: 20,
          fontWeight: 300,
          letterSpacing: "4px",
        }}
      >
        BEYOND LIMITS
      </div>

      {/* 特性标签 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 60,
          opacity: featuresOpacity,
        }}
      >
        <FeatureBadge label="5G" delay={0} frame={frame} />
        <FeatureBadge label="A18" delay={10} frame={frame} />
        <FeatureBadge label="TITANIUM" delay={20} frame={frame} />
      </div>

      {/* 底部信息 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 24,
          color: "rgba(255,255,255,0.7)",
          opacity: interpolate(frame, [180, 210], [0, 1], {
            extrapolateRight: "clamp",
          }),
          letterSpacing: "2px",
        }}
      >
        THE FUTURE IS HERE
      </div>
    </AbsoluteFill>
  );
};

/**
 * 特性徽章组件
 */
const FeatureBadge = ({
  label,
  delay,
  frame,
}: {
  label: string;
  delay: number;
  frame: number;
}) => {
  const opacity = interpolate(frame, [150 + delay, 180 + delay], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame: frame - (150 + delay),
    fps: 30,
    config: {
      damping: 100,
      stiffness: 100,
    },
  });

  const y = interpolate(frame, [150 + delay, 180 + delay], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        padding: "16px 32px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "30px",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        fontSize: 20,
        fontWeight: 600,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        letterSpacing: "2px",
      }}
    >
      {label}
    </div>
  );
};
