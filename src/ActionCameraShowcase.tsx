import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { CameraModel } from "./components/CameraModel";
import { SceneLighting } from "./components/SceneLighting";
import { ParticleEffects } from "./components/ParticleEffects";
import { TextOverlay } from "./ui/TextOverlay";
import { getSceneIndex, getSceneBackgroundColor } from "./utils/sceneAnimations";
import { z } from "zod";

// 定义 Props 的 Schema
export const actionCameraShowcaseSchema = z.object({
	enableAudio: z.boolean().default(false),
	audioPath: z.string().default("/background.mp3"),
	cameraColor: z.string().default("#1a1a1a"),
});

export type ActionCameraShowcaseProps = z.infer<typeof actionCameraShowcaseSchema>;

/**
 * 运动相机产品展示动画 - 主组件
 *
 * 8个场景，40秒（1200帧 @ 30fps）
 */
export const ActionCameraShowcase = ({
	enableAudio,
	audioPath,
	cameraColor,
}: ActionCameraShowcaseProps) => {
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
        <CameraModel frame={frame} sceneIndex={sceneIndex} cameraColor={cameraColor} />

        {/* 粒子特效（条件渲染） */}
        <ParticleEffects frame={frame} sceneIndex={sceneIndex} />
      </ThreeCanvas>

      {/* 2D UI 文字叠加层 */}
      <TextOverlay frame={frame} />

      {/* 背景音乐（可选） */}
      {enableAudio && <Audio src={audioPath} />}
    </AbsoluteFill>
  );
};
