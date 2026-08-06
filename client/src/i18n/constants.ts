// i18n/constants.ts

export const LANGUAGES = ["en", "vi"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export const DEFAULT_NAMESPACE = "common";

export const NAMESPACES = [DEFAULT_NAMESPACE] as const;

export type Namespace = (typeof NAMESPACES)[number];
