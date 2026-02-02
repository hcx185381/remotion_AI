import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./src/index.ts");

// 配置使用本地浏览器，避免下载 Chrome Headless Shell
Config.setChromiumOpenGlRenderer("angle");
