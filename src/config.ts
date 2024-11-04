const WARNINGS = {
  MISSING_ACCESS_TOKEN:
    "Missing access token. Specify either MW_API_KEY environment variable or accessToken in the options parameter.",
};

export interface Config {
  serviceName: string;
  profilingServerUrl: string;
  accessToken: string;
  tenantID: string;
  mwAuthURL: string;
}

export let configDefault: Config = {
  serviceName: "Service-" + process.pid,
  profilingServerUrl: "",
  accessToken: "",
  tenantID: "",
  mwAuthURL: "https://app.middleware.io/api/v1/auth",
};

export const init = (config: Partial<Config> = {}): Config => {
  Object.keys(configDefault).forEach((key) => {
    // @ts-ignore
    configDefault[key] = config[key] ?? configDefault[key];
  });

  computeOptions(configDefault);
  return <Config>configDefault;
};

export function computeOptions(config: Partial<Config> = {}) {
  config.serviceName = process.env.MW_SERVICE_NAME ?? config.serviceName;
  config.accessToken = process.env.MW_API_KEY ?? config.accessToken;
  // Validate and warn
  if (!config.accessToken) {
    structuredLog("WARN", WARNINGS.MISSING_ACCESS_TOKEN);
  }
  return config;
}

const structuredLog = (
  level: string,
  message: string,
  attributes: Record<string, any> = {}
) => {
  console.log(`${level}: ${message}`, attributes);
};
