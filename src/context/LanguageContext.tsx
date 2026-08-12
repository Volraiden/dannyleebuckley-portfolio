import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { locales, translations } from '../locales';
import type { Locale } from '../locales';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('site-locale');
    if (saved === 'en' || saved === 'ru' || saved === 'uz' || saved === 'ar' || saved === 'tr') {
      return saved;
    }
    return 'en';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    window.localStorage.setItem('site-locale', newLocale);
  }, []);

  const t = useCallback(
    (key: string) => {
      const table = translations[locale] as Record<string, string>;
      const fallback = translations.en as Record<string, string>;
      return table[key] ?? fallback[key] ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export { locales };
