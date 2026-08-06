import { useEffect, useState } from "react";
import type { ThemeMode } from "./types";
import { getInitialMode, applyThemeMode } from "./utils";
import { useTranslation } from "react-i18next";

export default function ThemeToggle() {
  const { t } = useTranslation(["common"]);
  const [mode, setMode] = useState<ThemeMode>(() => getInitialMode() || "auto");

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  function toggleMode() {
    const nextMode: ThemeMode = mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem("theme", nextMode);
  }

  const label =
    mode === "auto" ? "Theme mode: auto (system). Click to switch to light mode." : `Theme mode: ${mode}. Click to switch mode.`;

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {mode === "auto" ? t(("theme-auto")) : mode === "dark" ?  t(("theme-dark")) :  t(("theme-light"))}
    </button>
  );
}
