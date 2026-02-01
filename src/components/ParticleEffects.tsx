import { interpolate } from "remotion";

/**
 * 速度线效果（场景4：极限运动）
 */
export const SpeedLines = ({ frame }: { frame: number }) => {
  const lines = [];
  const count = 50;

  // 速度从 0.5 加速到 3
  const speed = interpolate(frame, [450, 480], [0.5, 3], {
    extrapolateRight: "clamp",
  });

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const length = Math.random() * 3 + 1;

    // 渐入渐出 - 修复：使用两个 interpolate 分别处理淡入和淡出
    const fadeIn = interpolate(frame, [450 + i * 2, 480 + i * 2], [0, 0.6], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
    const fadeOut = interpolate(frame, [600, 630], [0.6, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // 根据帧数选择使用 fadeIn 还是 fadeOut
    const baseOpacity = frame < 600 ? fadeIn : fadeOut;
    const opacity = baseOpacity * (1 - Math.abs(x) / 10);

    lines.push(
      <mesh key={i} position={[x, y, -10]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, length * speed, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={opacity} />
      </mesh>
    );
  }

  return <>{lines}</>;
};

/**
 * 浮动粒子效果（场景1：产品亮相）
 */
export const FloatingParticles = ({ frame }: { frame: number }) => {
  const particles = [];
  const count = 50;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 6 + Math.sin(frame * 0.02 + i) * 0.5;
    const y = Math.sin(frame * 0.03 + i * 0.1) * 3;
    const x = Math.cos(angle + frame * 0.01) * radius;
    const z = Math.sin(angle + frame * 0.01) * radius;

    const scale = (Math.sin(frame * 0.05 + i) + 1) * 0.5 + 0.5;
    const opacity = interpolate(frame, [0, 30], [0, 0.6], {
      extrapolateRight: "clamp",
    });

    particles.push(
      <mesh key={i} position={[x, y, z]} scale={scale}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#667eea"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>
    );
  }

  return <>{particles}</>;
};

/**
 * 粒子特效入口组件
 * 根据场景渲染不同的粒子效果
 */
export const ParticleEffects = ({
  frame,
  sceneIndex,
}: {
  frame: number;
  sceneIndex: number;
}) => {
  // 场景1: 浮动粒子
  if (sceneIndex === 0 && frame < 150) {
    return <FloatingParticles frame={frame} />;
  }

  // 场景4: 速度线
  if (sceneIndex === 3 && frame >= 450 && frame < 630) {
    return <SpeedLines frame={frame} />;
  }

  return null;
};
