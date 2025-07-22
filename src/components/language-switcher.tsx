import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';
import React from 'react';

// Import flag components dynamically to reduce bundle size
const flags = {
  en: React.lazy(() => import('country-flag-icons/react/3x2/US')),
  ru: React.lazy(() => import('country-flag-icons/react/3x2/RU')),
  uz: React.lazy(() => import('country-flag-icons/react/3x2/UZ')),
  ko: React.lazy(() => import('country-flag-icons/react/3x2/KR')),
  vi: React.lazy(() => import('country-flag-icons/react/3x2/VN')),
  lk: React.lazy(() => import('country-flag-icons/react/3x2/LK')),
  th: React.lazy(() => import('country-flag-icons/react/3x2/TH')),
  ph: React.lazy(() => import('country-flag-icons/react/3x2/PH')),
  id: React.lazy(() => import('country-flag-icons/react/3x2/ID')),
  kh: React.lazy(() => import('country-flag-icons/react/3x2/KH')),
  mm: React.lazy(() => import('country-flag-icons/react/3x2/MM')),
  zh: React.lazy(() => import('country-flag-icons/react/3x2/CN')),
};

// Fallback component for loading flags
const FlagIcon = ({ code }: { code: keyof typeof flags }) => {
  const Flag = flags[code];
  return (
    <React.Suspense fallback={<span className="w-5 h-5 bg-gray-200 rounded-sm" />}>
      <Flag className="w-5 h-5 rounded-sm overflow-hidden border border-gray-200" />
    </React.Suspense>
  );
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

    // en | eng - English
    // ru | rus - Russian
    // uz | uzb - Uzbek
    // ko | kor - Korean
    // vi | vie - Vietnamese
    // lk | lka - Sri Lanka
    // th | tha - Thailand
    // ph | phi - Philippines
    // id | ind - Indonesia
    // kh | khm - Cambodia
    // mm | mya - Myanmar
    // zh | chi - Chinese

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uz', name: 'Oʻzbekcha' },
    { code: 'ko', name: '한국어' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
    { code: 'zh', name: '中文' },
    { code: 'ph', name: 'Filipino' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'kh', name: 'ភាសាខ្មែរ' },
    { code: 'lk', name: 'සිංහල' },
    { code: 'mm', name: 'မြန်မာဘာသာ' },
  ] as const;

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <FlagIcon code={currentLang.code} />
          <span className="hidden sm:inline">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 ${currentLanguage === lang.code ? 'bg-accent' : ''}`}
          >
            <FlagIcon code={lang.code} />
            <span>{lang.name}</span>
            {currentLanguage === lang.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
