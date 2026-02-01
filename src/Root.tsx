import { Composition } from "remotion";
import { RemotionIntroduction } from "./RemotionIntroduction";
import { InstallationDemo } from "./InstallationDemo";
import { RotatingCube } from "./RotatingCube";
import { BouncingSphere } from "./BouncingSphere";
import { ProductShowcase } from "./ProductShowcase";
import { ActionCameraShowcase } from "./ActionCameraShowcase";

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
        defaultProps={{
          title: "什么是 Remotion？",
        }}
      />
      <Composition
        id="InstallationDemo"
        component={InstallationDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RotatingCube"
        component={RotatingCube}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="BouncingSphere"
        component={BouncingSphere}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ProductShowcase"
        component={ProductShowcase}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ActionCameraShowcase"
        component={ActionCameraShowcase}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
