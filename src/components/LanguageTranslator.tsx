import React, { useState, useRef, useEffect } from 'react';
import { Languages, Search, Check, ChevronDown, X } from 'lucide-react';

const PINNED_LANGUAGES = [
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'zh-CN', label: 'Chinese', native: '中文' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

const ALL_LANGUAGES = [
  { code: 'af', label: 'Afrikaans' },
  { code: 'sq', label: 'Albanian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hy', label: 'Armenian' },
  { code: 'az', label: 'Azerbaijani' },
  { code: 'eu', label: 'Basque' },
  { code: 'be', label: 'Belarusian' },
  { code: 'bn', label: 'Bengali' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'ceb', label: 'Cebuano' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'zh-TW', label: 'Chinese (Traditional)' },
  { code: 'co', label: 'Corsican' },
  { code: 'hr', label: 'Croatian' },
  { code: 'cs', label: 'Czech' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'eo', label: 'Esperanto' },
  { code: 'et', label: 'Estonian' },
  { code: 'fi', label: 'Finnish' },
  { code: 'fr', label: 'French' },
  { code: 'fy', label: 'Frisian' },
  { code: 'gl', label: 'Galician' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ht', label: 'Haitian Creole' },
  { code: 'ha', label: 'Hausa' },
  { code: 'haw', label: 'Hawaiian' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hmn', label: 'Hmong' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'ig', label: 'Igbo' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ga', label: 'Irish' },
  { code: 'it', label: 'Italian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'jv', label: 'Javanese' },
  { code: 'kn', label: 'Kannada' },
  { code: 'kk', label: 'Kazakh' },
  { code: 'km', label: 'Khmer' },
  { code: 'rw', label: 'Kinyarwanda' },
  { code: 'ko', label: 'Korean' },
  { code: 'ku', label: 'Kurdish' },
  { code: 'ky', label: 'Kyrgyz' },
  { code: 'lo', label: 'Lao' },
  { code: 'lv', label: 'Latvian' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'lb', label: 'Luxembourgish' },
  { code: 'mk', label: 'Macedonian' },
  { code: 'mg', label: 'Malagasy' },
  { code: 'ms', label: 'Malay' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mt', label: 'Maltese' },
  { code: 'mi', label: 'Maori' },
  { code: 'mr', label: 'Marathi' },
  { code: 'mn', label: 'Mongolian' },
  { code: 'my', label: 'Myanmar (Burmese)' },
  { code: 'ne', label: 'Nepali' },
  { code: 'no', label: 'Norwegian' },
  { code: 'ny', label: 'Nyanja (Chichewa)' },
  { code: 'or', label: 'Odia (Oriya)' },
  { code: 'ps', label: 'Pashto' },
  { code: 'fa', label: 'Persian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sm', label: 'Samoan' },
  { code: 'gd', label: 'Scots Gaelic' },
  { code: 'sr', label: 'Serbian' },
  { code: 'st', label: 'Sesotho' },
  { code: 'sn', label: 'Shona' },
  { code: 'sd', label: 'Sindhi' },
  { code: 'si', label: 'Sinhala' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'so', label: 'Somali' },
  { code: 'es', label: 'Spanish' },
  { code: 'su', label: 'Sundanese' },
  { code: 'sw', label: 'Swahili' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tl', label: 'Tagalog (Filipino)' },
  { code: 'tg', label: 'Tajik' },
  { code: 'ta', label: 'Tamil' },
  { code: 'tt', label: 'Tatar' },
  { code: 'te', label: 'Telugu' },
  { code: 'th', label: 'Thai' },
  { code: 'tr', label: 'Turkish' },
  { code: 'tk', label: 'Turkmen' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ug', label: 'Uyghur' },
  { code: 'uz', label: 'Uzbek' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'cy', label: 'Welsh' },
  { code: 'xh', label: 'Xhosa' },
  { code: 'yi', label: 'Yiddish' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'zu', label: 'Zulu' },
];

const LanguageTranslator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const applyLanguage = (code: string) => {
    const win = window as any;
    // Try Google Translate cookie approach
    const setCookie = (name: string, value: string) => {
      document.cookie = `${name}=${value}; path=/; domain=${window.location.hostname}`;
    };
    setCookie('googtrans', `/en/${code}`);
    setCookie('googtrans', `/en/${code}`);

    // If Google Translate widget exists, trigger it
    if (win.google?.translate?.TranslateElement) {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
      }
    } else {
      // Load Google Translate if not yet loaded
      win.googleTranslateElementInit = () => {
        if (win.google?.translate?.TranslateElement) {
          const el = document.getElementById('google_translate_element_hidden');
          if (el && el.innerHTML === '') {
            new win.google.translate.TranslateElement(
              { pageLanguage: 'en', autoDisplay: false },
              'google_translate_element_hidden'
            );
          }
          setTimeout(() => {
            const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (select) {
              select.value = code;
              select.dispatchEvent(new Event('change'));
            }
          }, 800);
        }
      };

      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.id = 'google-translate-script';
        document.body.appendChild(script);
      } else {
        win.googleTranslateElementInit?.();
      }
    }

    setSelected(code);
    setOpen(false);
    setSearch('');
  };

  const resetLanguage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const win = window as any;
    // Clear cookie
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setSelected(null);
    // Reload to restore English
    window.location.reload();
  };

  const selectedLang =
    PINNED_LANGUAGES.find(l => l.code === selected) ||
    ALL_LANGUAGES.find(l => l.code === selected);

  const searchResults = search.trim()
    ? ALL_LANGUAGES.filter(l =>
        l.label.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden GT container */}
      <div id="google_translate_element_hidden" className="hidden" />

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all shadow-sm min-w-[160px]"
      >
        <Languages className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
       <span className="flex-1 text-left font-bold text-gray-700 dark:text-white truncate"
  style={{ fontSize: 'clamp(9px, 1.8vw, 12px)' }}>
  {selectedLang ? selectedLang.label : 'Language'}
</span>
        {selected ? (
          <X
            className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 transition-colors shrink-0"
            onClick={resetLanguage}
          />
        ) : (
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[99999] overflow-hidden">

          {/* Search bar */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search language..."
                className="flex-1 text-xs bg-transparent text-gray-700 dark:text-white placeholder-gray-400 outline-none font-medium"
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Search results */}
          {search.trim() ? (
            <div className="max-h-52 overflow-y-auto py-1.5">
              {searchResults.length > 0 ? (
                searchResults.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => applyLanguage(lang.code)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{lang.label}</span>
                    {selected === lang.code && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))
              ) : (
                <p className="text-center text-xs text-gray-400 py-6">No languages found</p>
              )}
            </div>
          ) : (
            /* Pinned 5 languages */
            <div className="p-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-2 pb-1.5 pt-1">
                Quick Select
              </p>
              {PINNED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => applyLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${
                    selected === lang.code
                      ? 'bg-brand-50 dark:bg-brand-900/30'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{lang.label}</span>
                    <span className="text-[11px] text-gray-400">{lang.native}</span>
                  </div>
                  {selected === lang.code && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                </button>
              ))}
              <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-800 px-2">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Search above for more languages
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Google Translate suppression styles */}
      <style>{`
        .goog-te-banner-frame, .goog-tooltip, #goog-gt-tt { display: none !important; }
        body { top: 0 !important; }
        .goog-te-menu-frame { z-index: 999999999 !important; }
        .skiptranslate { display: none !important; }
      `}</style>
    </div>
  );
};

export default LanguageTranslator;