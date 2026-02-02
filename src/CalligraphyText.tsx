import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { z } from "zod";

// 定义 Props 的 Schema（可视化编辑参数）
export const calligraphyTextSchema = z.object({
	text: z.string().default("HCX"),
	inkColor: z.string().default("#0a0a0a"),
	backgroundColor1: z.string().default("#f5f0e6"),
	backgroundColor2: z.string().default("#ede4d3"),
	backgroundColor3: z.string().default("#e8dcc8"),
	enableParticles: z.boolean().default(true),
	enableStamp: z.boolean().default(true),
	fontSize: z.number().min(50).max(400).default(250),
	writingSpeed: z.number().min(5).max(60).default(15),
});

// 导出 TypeScript 类型
export type CalligraphyTextProps = z.infer<typeof calligraphyTextSchema>;

// 墨水粒子组件
const InkParticle = ({
	x,
	y,
	frame,
	delay,
	color,
}: {
	x: number;
	y: number;
	frame: number;
	delay: number;
	color: string;
}) => {
	const opacity = spring({
		frame: frame - delay,
		fps: 30,
		config: {
			damping: 200,
			mass: 2,
			stiffness: 100,
		},
	});

	const scale = spring({
		frame: frame - delay,
		fps: 30,
		config: {
			damping: 200,
			mass: 1,
			stiffness: 80,
		},
	});

	const angle = (frame - delay) * 2;
	const distance = interpolate(frame - delay, [0, 30], [0, 50]);

	const currentX = x + Math.cos((angle * Math.PI) / 180) * distance;
	const currentY = y + Math.sin((angle * Math.PI) / 180) * distance;

	if (frame < delay) return null;

	return (
		<div
			style={{
				position: "absolute",
				left: currentX,
				top: currentY,
				width: 8,
				height: 8,
				borderRadius: "50%",
				backgroundColor: color,
				opacity: Math.max(0, 1 - (frame - delay) / 40),
				transform: `scale(${scale * 0.5})`,
				pointerEvents: "none",
			}}
		/>
	);
};

// 主组件
export const CalligraphyText = ({
	text,
	inkColor,
	backgroundColor1,
	backgroundColor2,
	backgroundColor3,
	enableParticles,
	enableStamp,
	fontSize,
	writingSpeed,
}: CalligraphyTextProps) => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	// 将文字分解为字符数组
	const characters = text.split("");

	// 计算每个字符的开始帧
	const charStartFrames = characters.map((_, index) => index * writingSpeed);

	// 整体缩放和淡入效果
	const globalOpacity = spring({
		frame,
		fps: 30,
		config: {
			damping: 200,
			mass: 5,
			stiffness: 50,
		},
	});

	const globalScale = interpolate(frame, [0, 20], [0.9, 1], {
		extrapolateRight: "clamp",
	});

	// 背景纸张纹理效果
	const paperTextureOpacity = interpolate(frame, [0, 20], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, ${backgroundColor1} 0%, ${backgroundColor2} 50%, ${backgroundColor3} 100%)`,
			}}
		>
			{/* 纸张纹理叠加 */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `
						repeating-linear-gradient(
							0deg,
							transparent,
							transparent 2px,
							rgba(0, 0, 0, 0.02) 2px,
							rgba(0, 0, 0, 0.02) 4px
						),
						repeating-linear-gradient(
							90deg,
							transparent,
							transparent 2px,
							rgba(0, 0, 0, 0.02) 2px,
							rgba(0, 0, 0, 0.02) 4px
						)
					`,
					opacity: paperTextureOpacity,
				}}
			/>

			{/* 主内容区域 */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					opacity: globalOpacity,
					transform: `scale(${globalScale})`,
				}}
			>
				{/* 文字容器 */}
				<div
					style={{
						display: "flex",
						gap: fontSize * 0.1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{characters.map((char, index) => {
						const startFrame = charStartFrames[index];
						const charProgress = spring({
							frame: frame - startFrame,
							fps: 30,
							config: {
								damping: 50,
								mass: 3,
								stiffness: 80,
							},
						});

						// 字符透明度和缩放动画
						const opacity = interpolate(
							charProgress,
							[0, 0.3, 0.7, 1],
							[0, 0.5, 0.8, 1]
						);
						const scale = interpolate(charProgress, [0, 0.5, 1], [0.5, 1.1, 1]);
						const blur = interpolate(charProgress, [0, 0.5, 1], [8, 2, 0]);

						// 墨迹扩散效果
						const textShadow = `0 0 ${blur * 2}px ${inkColor}33, 0 ${blur}px ${blur}px ${inkColor}22`;

						if (frame < startFrame) return null;

						// 为每个字符添加粒子
						const particles = enableParticles
							? Array.from({ length: 5 }, (_, i) => {
									const angle = (index * 60 + i * 72) * (Math.PI / 180);
									const distance = fontSize * 0.8;
									const x = width / 2 + Math.cos(angle) * distance;
									const y = height / 2 + Math.sin(angle) * distance;
									return (
										<InkParticle
											key={i}
											x={x}
											y={y}
											frame={frame}
											delay={startFrame + i * 3}
											color={inkColor}
										/>
									);
							  })
							: [];

						return (
							<div
								key={index}
								style={{
									fontSize: `${fontSize}px`,
									fontWeight: "bold",
									color: inkColor,
									fontFamily: '"Brush Script MT", "KaiTi", "STKaiti", "楷体", serif',
									opacity,
									transform: `scale(${scale})`,
									filter: `blur(${blur}px)`,
									textShadow,
									position: "relative",
									whiteSpace: "nowrap",
								}}
							>
								{char}
								{particles}
							</div>
						);
					})}
				</div>
			</div>

			{/* 装饰印章 */}
			{enableStamp && (
				<div
					style={{
						position: "absolute",
						bottom: 100,
						right: 150,
						width: 80,
						height: 80,
						border: `3px solid #c41e3a`,
						borderRadius: "4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 24,
						fontWeight: "bold",
						color: "#c41e3a",
						fontFamily: "serif",
						opacity: interpolate(
							frame,
							[
								charStartFrames[charStartFrames.length - 1] + 30,
								charStartFrames[charStartFrames.length - 1] + 60,
							],
							[0, 1],
							{
								extrapolateRight: "clamp",
							}
						),
						transform: `rotate(${interpolate(
							frame,
							[
								charStartFrames[charStartFrames.length - 1] + 30,
								charStartFrames[charStartFrames.length - 1] + 60,
							],
							[-5, 0],
							{
								extrapolateRight: "clamp",
							}
						)}deg)`,
					}}
				>
					印
				</div>
			)}
		</AbsoluteFill>
	);
};
