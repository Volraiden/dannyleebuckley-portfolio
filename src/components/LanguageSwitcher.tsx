import { useState, useRef, useEffect } from 'react';
import { useLanguage, locales } from '../context/LanguageContext';
import type { Locale } from '../locales';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <div className={`language-switcher ${open ? 'open' : ''}`} ref={ref}>
      <button
        type="button"
        className="language-switcher-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <img
          className="language-switcher-flag"
          src={current.flagSrc}
          alt=""
          width={18}
          height={12}
          loading="eager"
          decoding="async"
        />
        <span className="language-switcher-name">{current.name}</span>
        <svg className="language-switcher-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="language-switcher-dropdown" role="listbox">
          {locales.map((opt) => (
            <li key={opt.code} role="option" aria-selected={locale === opt.code}>
              <button
                type="button"
                className={`language-switcher-option ${locale === opt.code ? 'active' : ''}`}
                onClick={() => {
                  setLocale(opt.code as Locale);
                  setOpen(false);
                }}
              >
                <img
                  className="language-switcher-flag"
                  src={opt.flagSrc}
                  alt=""
                  width={18}
                  height={12}
                  loading="lazy"
                  decoding="async"
                />
                <span>{opt.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
