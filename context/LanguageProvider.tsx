"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, translations } from "@/data/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
