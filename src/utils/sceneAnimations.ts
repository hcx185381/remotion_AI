import { interpolate, spring } from "remotion";

/**
 * 场景配置
 */
export const SCENE_CONFIG = [
  { start: 0, end: 150, name: "intro" },
  { start: 150, end: 300, name: "specs" },
  { start: 300, end: 450, name: "lens" },
  { start: 450, end: 630, name: "sports" },
  { start: 630, end: 780, name: "ports" },
  { start: 780, end: 930, name: "smart" },
  { start: 930, end: 1080, name: "slogan" },
  { start: 1080, end: 1200, name: "cta" },
] as const;

/**
 * 获取当前场景索引
 */
export const getSceneIndex = (frame: number): number => {
  return SCENE_CONFIG.findIndex(
    (scene) => frame >= scene.start && frame < scene.end
  );
};

/**
 * 颜色插值函数
 */
const interpolateColor = (
  frame: number,
  range: [number, number],
  colors: [string, string]
): string => {
  const [start, end] = range;
  if (frame < start) return colors[0];
  if (frame > end) return colors[1];

  const progress = (frame - start) / (end - start);

  // 解析颜色
  const parseColor = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const color1 = parseColor(colors[0]);
  const color2 = parseColor(colors[1]);

  const r = Math.round(color1.r + (color2.r - color1.r) * progress);
  const g = Math.round(color1.g + (color2.g - color1.g) * progress);
  const b = Math.round(color1.b + (color2.b - color1.b) * progress);

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * 获取场景背景颜色
 */
export const getSceneBackgroundColor = (frame: number): string => {
  if (frame < 60)
    return interpolateColor(frame, [0, 60], ["#000000", "#0a1628"]);
  if (frame < 300) return "#0a1628";
  if (frame < 450)
    return interpolateColor(frame, [300, 450], ["#0a1628", "#0f1a30"]);
  if (frame < 480)
    return interpolateColor(frame, [450, 480], ["#0f1a30", "#1a0a28"]);
  if (frame < 780) return "#1a0a28";
  if (frame < 930)
    return interpolateColor(frame, [780, 930], ["#1a0a28", "#0a1a28"]);
  if (frame < 1080) return "#0a1a28";
  return interpolateColor(frame, [1140, 1200], ["#0a1a28", "#000000"]);
};

/**
 * 获取相机动画参数
 */
export const getCameraAnimation = (
  frame: number,
  sceneIndex: number
): {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
} => {
  const base = {
    x: 0,
    y: 0,
    z: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 1,
  };

  switch (sceneIndex) {
    case 0: // 场景1: 产品亮相
      return {
        ...base,
        scale: spring({
          frame,
          fps: 30,
          config: { damping: 80, stiffness: 100 },
        }),
        rotationY: interpolate(frame, [0, 150], [0, Math.PI * 2]),
        y:
          spring({
            frame: frame - 30,
            fps: 30,
            config: { damping: 100, stiffness: 50 },
          }) - 2,
      };

    case 1: // 场景2: 技术参数
      return {
        ...base,
        scale: interpolate(frame, [150, 200], [1, 1.2], {
          extrapolateRight: "clamp",
        }),
        rotationY: Math.PI * 2,
        y: Math.sin(frame * 0.1) * 0.02,
      };

    case 2: // 场景3: 镜头特写
      return {
        ...base,
        x: interpolate(frame, [300, 330], [0, -2], {
          extrapolateRight: "clamp",
        }),
        rotationY: interpolate(frame, [300, 330], [0, -Math.PI / 6], {
          extrapolateRight: "clamp",
        }),
        scale: 1,
      };

    case 3: // 场景4: 极限运动
      return {
        ...base,
        x: -2,
        rotationX: interpolate(frame, [450, 480], [0, Math.PI / 12], {
          extrapolateRight: "clamp",
        }),
        rotationZ: Math.sin(frame * 0.02) * 0.1,
        rotationY: -Math.PI / 6,
      };

    case 4: // 场景5: 接口展示
      return {
        ...base,
        x: interpolate(frame, [630, 660], [-2, 0], {
          extrapolateRight: "clamp",
        }),
        rotationY: interpolate(frame, [630, 660], [-Math.PI / 6, Math.PI], {
          extrapolateRight: "clamp",
        }),
      };

    case 5: // 场景6: 智能功能
      return {
        ...base,
        rotationY: Math.PI,
        scale: 1,
      };

    case 6: // 场景7: 品牌口号
      return {
        ...base,
        scale: interpolate(frame, [930, 960], [1.5, 0.8], {
          extrapolateRight: "clamp",
        }),
        rotationY: interpolate(frame, [930, 960], [Math.PI, 0], {
          extrapolateRight: "clamp",
        }),
      };

    case 7: // 场景8: 结尾
      return {
        ...base,
        scale: interpolate(frame, [1080, 1200], [0.8, 0], {
          extrapolateRight: "clamp",
        }),
        rotationY: 0,
      };

    default:
      return base;
  }
};
