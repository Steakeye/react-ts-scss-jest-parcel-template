import { AppLevel } from './Config';

export interface AppCoreConfig {
  level: AppLevel;
}

export interface APIConfig {
  root: string;
  versionStable?: string;
  versionDeprecated?: string;
  versionExperimental?: string;
}

export interface AuthConfig {
  clientID: string;
  domain: string;
  maxAge: string;
}

export interface URLsConfig {
  //TODO
}

export interface ExternalAssetsConfig {
  //TODO
}

export interface LegalConfig {
  GDPR: {
    consentLimitInDays: number;
    consentKey: string;
  };
}

export interface Config {
  api: APIConfig;
  app: AppCoreConfig;
  externalLinks?: URLsConfig;
  externalAssets?: ExternalAssetsConfig;
  legal?: LegalConfig;
}
