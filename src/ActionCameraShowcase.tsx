import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { CameraModel } from "./components/CameraModel";
import { SceneLighting } from "./components/SceneLighting";
import { ParticleEffects } from "./components/ParticleEffects";
import { TextOverlay } from "./ui/TextOverlay";
import { getSceneIndex, getSceneBackgroundColor } from "./utils/sceneAnimations";

/**
 * 运动相机产品展示动画 - 主组件
 *
 * 8个场景，40秒（1200帧 @ 30fps）
 * 遵循 Remotion skill 规则：
 * - 使用 ThreeCanvas 包裹 3D 内容
 * - 所有动画由 useCurrentFrame() 驱动
 * - 包含多层光照、粒子效果、文字叠加
 */
export const ActionCameraShowcase = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 获取当前场景索引
  const sceneIndex = getSceneIndex(frame);

  // 获取背景颜色
  const backgroundColor = getSceneBackgroundColor(frame);

  return (
    <AbsoluteFill style={{ background: backgroundColor }}>
      {/* 3D 场景 */}
      <ThreeCanvas width={width} height={height}>
        {/* 动态光照系统 */}
        <SceneLighting frame={frame} sceneIndex={sceneIndex} />

        {/* 3D 相机模型 */}
        <CameraModel frame={frame} sceneIndex={sceneIndex} />

        {/* 粒子特效（条件渲染） */}
        <ParticleEffects frame={frame} sceneIndex={sceneIndex} />
      </ThreeCanvas>

      {/* 2D UI 文字叠加层 */}
      <TextOverlay frame={frame} />

      {/* 背景音乐（如果有音频文件） */}
      <Audio src="/background.mp3" />
    </AbsoluteFill>
  );
};
