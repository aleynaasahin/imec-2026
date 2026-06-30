import { prisma } from './prisma';
import { Lang, pick } from './i18n';

// Loads all Text rows once per request and returns a typed getter.
export async function loadTexts(lang: Lang): Promise<(key: string, fallback?: string) => string> {
  const rows = await prisma.text.findMany();
  const map = new Map<string, { tr: string; en: string }>();
  for (const row of rows) map.set(row.key, { tr: row.tr, en: row.en });
  return (key: string, fallback = '') => {
    const v = map.get(key);
    if (!v) return fallback;
    return pick(v.tr, v.en, lang) || fallback;
  };
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany();
  const out: Record<string, string> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}
