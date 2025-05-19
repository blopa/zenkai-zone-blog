"use client";

import { I18nextProvider } from 'react-i18next';
import { ReactNode, useEffect } from 'react';
import i18n from '@/lib/i18n';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources?: any;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationsProviderProps) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    // If resources are provided, add them. This is useful if you're pre-loading translations.
    if (resources) {
      Object.keys(resources).forEach((ns) => {
        if (!i18n.hasResourceBundle(locale, ns)) {
          i18n.addResourceBundle(locale, ns, resources[ns]);
        }
      });
    }
  }, [locale, resources, i18n, namespaces]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
