
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AboutPage } from './components/AboutPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { EthicsPage } from './components/EthicsPage';
import { ContributionsPage } from './components/ContributionsPage';
import { CommunityPage } from './components/CommunityPage';
import { CrytoToolPage } from './components/CrytoToolPage';
import { ScrollToTop } from './components/ScrollToTop';
import { LanguageProvider } from './components/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/ethics" element={<EthicsPage />} />
            <Route path="/contributions" element={<ContributionsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/crytotool" element={<CrytoToolPage />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
