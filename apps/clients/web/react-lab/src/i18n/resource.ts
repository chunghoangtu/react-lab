import enCommon from "./locales/en/common.json" with { type: "json" };
import viCommon from "./locales/vi/common.json" with { type: "json" };

export const resources = {
  en: {
    common: enCommon,
  },
  vi: {
    common: viCommon,
  },
} as const;

export type AppLanguage = keyof typeof resources;
