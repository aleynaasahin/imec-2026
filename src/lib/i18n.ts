export type Lang = 'tr' | 'en';
export const LANGS: Lang[] = ['tr', 'en'];
export const DEFAULT_LANG: Lang = 'tr';

export function isLang(value: string | undefined | null): value is Lang {
  return value === 'tr' || value === 'en';
}

export function pick(tr: string, en: string, lang: Lang): string {
  if (lang === 'tr') return tr || en;
  return en || tr;
}
