import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const RemotionIntroduction = ({ title }: { title: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题淡入动画
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 标题缩放动画
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // 内容逐个出现
  const firstPointOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const secondPointOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  const thirdPointOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  const codeOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        color: "white",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          fontSize: 120,
          fontWeight: "bold",
          opacity,
          transform: `scale(${scale})`,
          marginBottom: 100,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 48,
          color: "#4a9eff",
          opacity: firstPointOpacity,
          marginBottom: 40,
          maxWidth: 1400,
          textAlign: "center",
        }}
      >
        用 React 代码创建视频的框架
      </div>

      {/* 特性列表 */}
      <div
        style={{
          fontSize: 36,
          opacity: secondPointOpacity,
          marginBottom: 30,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "#4a9eff" }}>✓</span>
          <span>使用所有 Web 技术：CSS、Canvas、SVG、WebGL</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "#4a9eff" }}>✓</span>
          <span>编程控制：变量、函数、API、算法</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "#4a9eff" }}>✓</span>
          <span>React 生态：可复用组件、热重载、包管理</span>
        </div>
      </div>

      {/* 代码示例 */}
      <div
        style={{
          marginTop: 60,
          padding: 40,
          backgroundColor: "#1a1a1a",
          borderRadius: 10,
          opacity: codeOpacity,
          fontFamily: "monospace",
          fontSize: 28,
          maxWidth: 1200,
        }}
      >
        <div style={{ color: "#888888", marginBottom: 20 }}>
          // 创建简单的淡入动画
        </div>
        <div>
          <span style={{ color: "#c678dd" }}>export</span>{" "}
          <span style={{ color: "#c678dd" }}>const</span>{" "}
          <span style={{ color: "#e5c07b" }}>MyVideo</span> = () ={" "}
          {"{"}
        </div>
        <div style={{ marginLeft: 40 }}>
          <span style={{ color: "#c678dd" }}>const</span>{" "}
          <span style={{ color: "#e5c07b" }}>frame</span> ={" "}
          <span style={{ color: "#61afef" }}>useCurrentFrame</span>();
        </div>
        <div style={{ marginLeft: 40 }}>
          <span style={{ color: "#c678dd" }}>const</span>{" "}
          <span style={{ color: "#e5c07b" }}>opacity</span> ={" "}
          <span style={{ color: "#61afef" }}>interpolate</span>(
        </div>
        <div style={{ marginLeft: 80 }}>
          frame, [0, 30], [0, 1]
        </div>
        <div style={{ marginLeft: 40 }}>
          );
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ color: "#c678dd" }}>return</span>{" "}
          {`<div style={{{{ opacity }}} />`}
        </div>
        <div>{"};"}</div>
      </div>
    </AbsoluteFill>
  );
};
