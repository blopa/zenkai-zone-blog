import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DEFAULT_LANGUAGE, USER_LANG_COOKIE_NAME } from './constants';

import enUSTranslations from '../data/locales/en-US/translation.json';

const RESOURCES = {
    'en-US': { translation: enUSTranslations },
    // Add other languages here, e.g.:
    // 'nl-NL': { translation: nlNLTranslations },
};

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false,
        defaultNS: 'translation',
        resources: RESOURCES,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie', 'localStorage', 'navigator'],
            lookupCookie: USER_LANG_COOKIE_NAME,
            caches: ['cookie', 'localStorage'],
        },
        react: {
                useSuspense: false,
        },
    });

export default i18next;
