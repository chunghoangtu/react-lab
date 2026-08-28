import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resource";
import { DEFAULT_LANGUAGE, LANGUAGES, NAMESPACES, DEFAULT_NAMESPACE } from "@i18n/constants";

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES,
  ns: NAMESPACES,
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
