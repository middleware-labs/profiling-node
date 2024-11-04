import { init as configInit } from "./config";
import { init as profilerInit } from "./profiler";
import { Config } from "./config";

export const track = (newConfig: Partial<Config> | undefined = {}): void => {
  const config = configInit(newConfig);
  profilerInit(config).then((r) => {});
};
