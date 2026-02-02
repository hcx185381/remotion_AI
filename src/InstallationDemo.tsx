import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { z } from "zod";

// 定义 Props 的 Schema
export const installationDemoSchema = z.object({
	title: z.string().default("安装 Remotion"),
	backgroundColor: z.string().default("#0f0f0f"),
	titleColor: z.string().default("#4a9eff"),
	terminalBackgroundColor: z.string().default("#1a1a1a"),
	accentColor: z.string().default("#4a9eff"),
	successColor: z.string().default("#27ca40"),
	tipText: z.string().default("开始创建你的第一个视频项目！"),
	command1: z.string().default("$ npx create-video@latest"),
	command2: z.string().default("Welcome to Remotion!"),
	command3: z.string().default("? Choose a template: Hello World"),
	command4: z.string().default("✓ Created your video project!"),
	command5: z.string().default("$ cd my-video"),
	command6: z.string().default("$ npm start"),
	command7: z.string().default("✓ Ready at http://localhost:3000"),
});

export type InstallationDemoProps = z.infer<typeof installationDemoSchema>;

const TerminalLine = ({
  text,
  frame,
  startFrame,
  color = "#ffffff",
}: {
  text: string;
  frame: number;
  startFrame: number;
  color?: string;
}) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const x = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [-50, 0],
    {}
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        color,
        fontFamily: "monospace",
        fontSize: 32,
        marginBottom: 15,
        whiteSpace: "pre",
      }}
    >
      {text}
    </div>
  );
};

export const InstallationDemo = ({
	title,
	backgroundColor,
	titleColor,
	terminalBackgroundColor,
	accentColor,
	successColor,
	tipText,
	command1,
	command2,
	command3,
	command4,
	command5,
	command6,
	command7,
}: InstallationDemoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 100,
    },
  });

  // 终端窗口出现
  const terminalOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const terminalScale = spring({
    frame: frame - 60,
    fps,
    config: {
      damping: 100,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        color: "white",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 60,
          color: titleColor,
        }}
      >
        {title}
      </div>

      {/* 终端窗口 */}
      <div
        style={{
          opacity: terminalOpacity,
          transform: `scale(${terminalScale})`,
          backgroundColor: terminalBackgroundColor,
          borderRadius: 10,
          padding: 30,
          width: 1400,
          boxShadow: "0 10px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* 终端标题栏 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
            paddingBottom: 20,
            borderBottom: "1px solid #333",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#27ca40",
            }}
          />
          <div
            style={{
              marginLeft: 20,
              color: "#888",
              fontSize: 24,
              fontFamily: "monospace",
            }}
          >
            terminal
          </div>
        </div>

        {/* 命令行 */}
        <div style={{ fontFamily: "monospace" }}>
          <TerminalLine
            text={command1}
            frame={frame}
            startFrame={120}
          />

          <TerminalLine
            text={command2}
            frame={frame}
            startFrame={180}
            color={accentColor}
          />

          <TerminalLine
            text={command3}
            frame={frame}
            startFrame={240}
            color="#888"
          />

          <TerminalLine
            text={command4}
            frame={frame}
            startFrame={300}
            color={successColor}
          />

          <TerminalLine
            text={command5}
            frame={frame}
            startFrame={360}
          />

          <TerminalLine
            text={command6}
            frame={frame}
            startFrame={420}
          />

          <TerminalLine
            text={command7}
            frame={frame}
            startFrame={480}
            color={successColor}
          />

          <TerminalLine
            text={
              frame > 540
                ? "$ "
                : ""
            }
            frame={frame}
            startFrame={540}
          />
        </div>
      </div>

      {/* 提示信息 */}
      {frame > 540 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            fontSize: 36,
            color: "#888",
            opacity: interpolate(frame, [540, 570], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {tipText}
        </div>
      )}
    </AbsoluteFill>
  );
};
