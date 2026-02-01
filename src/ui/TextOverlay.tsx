import { AbsoluteFill, interpolate, spring } from "remotion";
import { getSceneIndex } from "../utils/sceneAnimations";

/**
 * 文字动画组件
 */
const AnimatedText = ({
  children,
  frame,
  startFrame,
  endFrame,
  animationType = "fadeIn",
  delay = 0,
}: {
  children: string;
  frame: number;
  startFrame: number;
  endFrame?: number;
  animationType?: "fadeIn" | "slideUp" | "scaleIn" | "stagger";
  delay?: number;
}) => {
  const progress = frame - startFrame;

  // 计算动画样式
  let style: React.CSSProperties = {};

  switch (animationType) {
    case "fadeIn":
      style.opacity = interpolate(progress, [0 + delay, 30 + delay], [0, 1], {
        extrapolateRight: "clamp",
      });
      break;

    case "slideUp":
      style.opacity = interpolate(progress, [0 + delay, 30 + delay], [0, 1]);
      style.transform = `translateY(${interpolate(progress, [0 + delay, 30 + delay], [50, 0])}px)`;
      break;

    case "scaleIn":
      const scale = spring({
        frame: progress,
        fps: 30,
        config: { damping: 100, stiffness: 100 },
      });
      style.opacity = interpolate(progress, [0, 20], [0, 1]);
      style.transform = `scale(${scale})`;
      break;

    case "stagger":
      style.opacity = interpolate(progress, [delay, delay + 30], [0, 1]);
      style.transform = `translateX(${interpolate(progress, [delay, delay + 30], [-30, 0])}px)`;
      break;
  }

  // 淡出效果
  if (endFrame && frame > endFrame - 30) {
    const fadeOut = interpolate(frame, [endFrame - 30, endFrame], [1, 0]);
    style.opacity = (style.opacity as number) * fadeOut;
  }

  return <div style={style}>{children}</div>;
};

/**
 * 文字叠加层主组件
 */
export const TextOverlay = ({ frame }: { frame: number }) => {
  const sceneIndex = getSceneIndex(frame);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* 场景1: 产品亮相 */}
      {sceneIndex === 0 && (
        <>
          <div
            style={{
              fontSize: 96,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <AnimatedText frame={frame} startFrame={30} endFrame={150} animationType="scaleIn">
              ACTION CAM X1
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 42,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              fontWeight: 300,
              letterSpacing: "2px",
            }}
          >
            <AnimatedText frame={frame} startFrame={60} endFrame={150} animationType="fadeIn">
              重新定义运动拍摄
            </AnimatedText>
          </div>
        </>
      )}

      {/* 场景2: 技术参数 */}
      {sceneIndex === 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 25,
            alignItems: "flex-start",
            marginLeft: -400,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: "white",
              letterSpacing: "1px",
            }}
          >
            <AnimatedText frame={frame} startFrame={180} endFrame={300} animationType="stagger" delay={0}>
              4K 120fps 超高清
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 48,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={180} endFrame={300} animationType="stagger" delay={10}>
              5.3K 传感器
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 48,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={180} endFrame={300} animationType="stagger" delay={20}>
              180° 超广角镜头
            </AnimatedText>
          </div>
        </div>
      )}

      {/* 场景3: 镜头特写 */}
      {sceneIndex === 2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "flex-start",
            marginLeft: 300,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: "white",
            }}
          >
            <AnimatedText frame={frame} startFrame={330} endFrame={450} animationType="slideUp" delay={0}>
              f/1.8 大光圈
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={330} endFrame={450} animationType="slideUp" delay={15}>
              8片光学镜片
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={330} endFrame={450} animationType="slideUp" delay={30}>
              蓝宝石镀膜
            </AnimatedText>
          </div>
        </div>
      )}

      {/* 场景4: 极限运动 */}
      {sceneIndex === 3 && (
        <>
          <div
            style={{
              fontSize: 88,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <AnimatedText frame={frame} startFrame={480} endFrame={630} animationType="scaleIn">
              无畏挑战
            </AnimatedText>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
            }}
          >
            {["IP68 防水防尘", "-20° 耐低温"].map((text, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 32px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "30px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                <AnimatedText
                  frame={frame}
                  startFrame={510}
                  endFrame={630}
                  animationType="fadeIn"
                  delay={i * 15}
                >
                  {text}
                </AnimatedText>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 场景5: 接口展示 */}
      {sceneIndex === 4 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 25,
            alignItems: "flex-start",
            marginLeft: 350,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
            }}
          >
            <AnimatedText frame={frame} startFrame={660} endFrame={780} animationType="stagger" delay={0}>
              Type-C 快充接口
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={660} endFrame={780} animationType="stagger" delay={12}>
              HDMI 2.1 输出
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <AnimatedText frame={frame} startFrame={660} endFrame={780} animationType="stagger" delay={24}>
              通用支架接口
            </AnimatedText>
          </div>
        </div>
      )}

      {/* 场景6: 智能功能 */}
      {sceneIndex === 5 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "flex-start",
            marginLeft: -350,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: "#00ff88",
              textShadow: "0 0 20px rgba(0,255,136,0.5)",
            }}
          >
            <AnimatedText frame={frame} startFrame={810} endFrame={930} animationType="slideUp" delay={0}>
              AI 智能追踪
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 46,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <AnimatedText frame={frame} startFrame={810} endFrame={930} animationType="slideUp" delay={15}>
              电子防抖 3.0
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 46,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <AnimatedText frame={frame} startFrame={810} endFrame={930} animationType="slideUp" delay={30}>
              语音控制
            </AnimatedText>
          </div>
        </div>
      )}

      {/* 场景7: 品牌口号 */}
      {sceneIndex === 6 && (
        <>
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <AnimatedText frame={frame} startFrame={960} endFrame={1080} animationType="scaleIn">
              记录每一个精彩瞬间
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 38,
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <AnimatedText frame={frame} startFrame={990} endFrame={1080} animationType="fadeIn">
              专业运动摄影师的首选
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#ffcc00",
              textAlign: "center",
            }}
          >
            <AnimatedText frame={frame} startFrame={1020} endFrame={1080} animationType="fadeIn">
              ★★★★★ 4.9/5.0
            </AnimatedText>
          </div>
        </>
      )}

      {/* 场景8: 结尾CTA */}
      {sceneIndex === 7 && (
        <>
          <div
            style={{
              fontSize: 96,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <AnimatedText frame={frame} startFrame={1110} endFrame={1200} animationType="fadeIn">
              ACTION CAM X1
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 52,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <AnimatedText frame={frame} startFrame={1140} endFrame={1200} animationType="fadeIn">
              ¥2,999 起
            </AnimatedText>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#4a9eff",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            <AnimatedText frame={frame} startFrame={1140} endFrame={1200} animationType="scaleIn">
              立即选购 →
            </AnimatedText>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
