import { Composition } from "remotion";
import { RemotionIntroduction, remotionIntroductionSchema } from "./RemotionIntroduction";
import { InstallationDemo, installationDemoSchema } from "./InstallationDemo";
import { RotatingCube, rotatingCubeSchema } from "./RotatingCube";
import { BouncingSphere, bouncingSphereSchema } from "./BouncingSphere";
import { ProductShowcase, productShowcaseSchema } from "./ProductShowcase";
import { ActionCameraShowcase, actionCameraShowcaseSchema } from "./ActionCameraShowcase";
import { CalligraphyText, calligraphyTextSchema } from "./CalligraphyText";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="RemotionIntroduction"
        component={RemotionIntroduction}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={remotionIntroductionSchema}
        defaultProps={{
          title: "Remotion",
          subtitle: "用 React 代码创建视频的框架",
          backgroundColor: "#0f0f0f",
          titleColor: "#ffffff",
          accentColor: "#4a9eff",
          codeBackgroundColor: "#1a1a1a",
          feature1: "使用所有 Web 技术：CSS、Canvas、SVG、WebGL",
          feature2: "编程控制：变量、函数、API、算法",
          feature3: "React 生态：可复用组件、热重载、包管理",
          showCode: true,
        }}
      />
      <Composition
        id="InstallationDemo"
        component={InstallationDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        schema={installationDemoSchema}
        defaultProps={{
          title: "安装 Remotion",
          backgroundColor: "#0f0f0f",
          titleColor: "#4a9eff",
          terminalBackgroundColor: "#1a1a1a",
          accentColor: "#4a9eff",
          successColor: "#27ca40",
          tipText: "开始创建你的第一个视频项目！",
          command1: "$ npx create-video@latest",
          command2: "Welcome to Remotion!",
          command3: "? Choose a template: Hello World",
          command4: "✓ Created your video project!",
          command5: "$ cd my-video",
          command6: "$ npm start",
          command7: "✓ Ready at http://localhost:3000",
        }}
      />
      <Composition
        id="RotatingCube"
        component={RotatingCube}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={rotatingCubeSchema}
        defaultProps={{
          cubeColor: "#4a9eff",
          cubeSize: 3,
          rotationSpeed: 0.02,
          metalness: 0.5,
          roughness: 0.1,
          pulseEffect: true,
          lightColor: "#4a9eff",
        }}
      />
      <Composition
        id="BouncingSphere"
        component={BouncingSphere}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={bouncingSphereSchema}
        defaultProps={{
          ballColor: "#4a9eff",
          ballSize: 1,
          bounceHeight: 2.5,
          bounceFrequency: 0.15,
          groundColor: "#333333",
          metalness: 0.3,
          roughness: 0.4,
          emissiveColor: "#1a4a8f",
          squashEffect: true,
        }}
      />
      <Composition
        id="ProductShowcase"
        component={ProductShowcase}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={productShowcaseSchema}
        defaultProps={{
          title: "PRO",
          subtitle: "BEYOND LIMITS",
          backgroundColor1: "#667eea",
          backgroundColor2: "#764ba2",
          deviceColor: "#1a1a1a",
          screenColor: "#667eea",
          enableParticles: true,
          enableRings: true,
          feature1: "5G",
          feature2: "A18",
          feature3: "TITANIUM",
        }}
      />
      <Composition
        id="ActionCameraShowcase"
        component={ActionCameraShowcase}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        schema={actionCameraShowcaseSchema}
        defaultProps={{
          enableAudio: false,
          audioPath: "/background.mp3",
          cameraColor: "#1a1a1a",
        }}
      />
      <Composition
        id="CalligraphyText"
        component={CalligraphyText}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={calligraphyTextSchema}
        defaultProps={{
          text: "HCX",
          inkColor: "#0a0a0a",
          backgroundColor1: "#f5f0e6",
          backgroundColor2: "#ede4d3",
          backgroundColor3: "#e8dcc8",
          enableParticles: true,
          enableStamp: true,
          fontSize: 250,
          writingSpeed: 15,
        }}
      />
    </>
  );
};
