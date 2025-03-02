import { defaultLang, ui } from './ui';

export const showDefaultLang = false;

/**
 * Obtiene el idioma actual desde la URL, teniendo en cuenta subpaths como GitHub Pages.
 */
export function getLangFromUrl(url: URL): keyof typeof ui {
  const pathParts = url.pathname.split('/').filter(Boolean);
  const lang = pathParts[1]; // Consideramos el segundo segmento después del subpath
  return lang && lang in ui ? (lang as keyof typeof ui) : defaultLang;
}

/**
 * Retorna una función para traducir las claves de la UI al idioma actual.
 */
export function useTranslations(lang: keyof typeof ui) {
  return (key: keyof (typeof ui)[typeof defaultLang]) => {
    return (ui[lang] as unknown as Record<string, string>)[key] || (ui[defaultLang] as unknown as Record<string, string>)[key] || key;
  };
}

/**
 * Traduce una ruta basada en el idioma actual.
 */
export function useTranslatedPath(lang: keyof typeof ui) {
  return (path: string, targetLang: string = lang) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return !showDefaultLang && targetLang === defaultLang
      ? `${normalizedPath}`
      : `/${targetLang}${normalizedPath}`;
  };
}

