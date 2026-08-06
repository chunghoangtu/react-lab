import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation(["common"]);

  function handelChangeLang(event: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(event.target.value);
  }
  return (
    <div>
      <select
        value={i18n.language}
        onChange={handelChangeLang}
        className="
          h-10 rounded-md border border-border
          bg-background
          px-3
          text-foreground
          focus:outline-none
          focus:ring-2
          focus:ring-ring
        "
      >
        <option value="en">English</option>
        <option value="vi">Vietnam</option>
      </select>
    </div>
  );
}
