import { interpolate } from "remotion";

/**
 * 动态场景光照系统
 * 根据场景和帧数调整光照强度和位置
 */
export const SceneLighting = ({
  frame,
  sceneIndex,
}: {
  frame: number;
  sceneIndex: number;
}) => {
  // 环境光 - 从暗变亮
  const ambientIntensity = interpolate(frame, [0, 60], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  // 主光源位置 - 围绕相机缓慢旋转
  const mainLightAngle = frame * 0.01;
  const mainLightPosition = [
    Math.sin(mainLightAngle) * 10,
    10,
    Math.cos(mainLightAngle) * 10,
  ];

  // 轮廓光 - 场景3-5增强（镜头特写和极限运动场景）
  const rimLightIntensity = sceneIndex >= 2 && sceneIndex <= 4 ? 0.8 : 0.4;

  // 镜头反光 - 场景3增强
  const lensFlareIntensity =
    sceneIndex === 2 ? Math.sin(frame * 0.05) * 0.5 + 0.5 : 0;

  // 运动氛围光 - 场景4（极限运动）
  const sportsLightIntensity = sceneIndex === 3 ? 0.6 : 0;

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={ambientIntensity} />

      {/* 主方向光 */}
      <directionalLight
        position={mainLightPosition as [number, number, number]}
        intensity={0.8}
        castShadow
      />

      {/* 蓝色补光 */}
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4488ff" />

      {/* 顶部聚光灯 */}
      <spotLight
        position={[5, 15, 5]}
        angle={0.3}
        penumbra={1}
        intensity={rimLightIntensity}
        color="#ffffff"
      />

      {/* 镜头反光（场景3） */}
      {lensFlareIntensity > 0 && (
        <pointLight
          position={[0, 0.8, 2]}
          intensity={lensFlareIntensity}
          color="#aaccff"
          distance={3}
        />
      )}

      {/* 运动氛围光（场景4） */}
      {sportsLightIntensity > 0 && (
        <>
          <pointLight position={[5, 0, 5]} intensity={sportsLightIntensity} color="#ff6600" />
          <pointLight
            position={[-5, 2, -5]}
            intensity={sportsLightIntensity * 0.5}
            color="#ff3300"
          />
        </>
      )}

      {/* 智能功能氛围光（场景6） */}
      {sceneIndex === 5 && (
        <pointLight
          position={[0, 0.3, -2]}
          intensity={0.6}
          color="#00ff88"
          distance={5}
        />
      )}
    </>
  );
};
