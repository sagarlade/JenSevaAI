import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { LanguageCode } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-1 w-full">
        <ChatInterface language={language} />
      </main>
    </div>
  );
};

export default App;