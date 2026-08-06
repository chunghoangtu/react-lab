import "i18next";

import { resources } from "./resource";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof resources["en"];
  }
}
