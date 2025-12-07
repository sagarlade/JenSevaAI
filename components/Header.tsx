import React from 'react';
import { Landmark, Languages } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['en'];

  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <Landmark className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-xs text-orange-100 opacity-90">{t.subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-orange-700 bg-opacity-30 px-3 py-1.5 rounded-lg border border-orange-400 border-opacity-30">
          <Languages className="w-4 h-4 text-orange-100" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer [&>option]:text-gray-900"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};