import { vi, beforeEach, afterAll } from "vitest";
import enCommon from "./src/i18n//locales/en/common.json" with { type: "json" };
type TranslationKey = keyof typeof enCommon;

vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (i18nKey: TranslationKey) =>enCommon[i18nKey],
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

// Tạo mock object giả lập Storage
const windowMock = () => ({
  matchMedia: vi.fn(() => ({
    matches: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
  localStorage: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

beforeEach(() => {
  vi.stubGlobal("window", windowMock());
});

afterAll(() => {
  vi.clearAllMocks();
});
