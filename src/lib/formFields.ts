import type { FormField } from '@prisma/client';
import { Lang, pick } from './i18n';
import type { FormFieldDef } from '@/components/RegistrationForm';

// options stored as "Tr1|En1;;Tr2|En2;;..."
export function parseOptions(raw: string, lang: Lang): { value: string; label: string }[] {
  if (!raw) return [];
  return raw
    .split(';;')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [tr, en] = chunk.split('|').map((x) => (x || '').trim());
      const label = pick(tr || '', en || '', lang) || tr || en || chunk;
      return { value: tr || en || chunk, label };
    });
}

export function toFieldDefs(rows: FormField[], lang: Lang): FormFieldDef[] {
  return rows
    .filter((r) => r.enabled)
    .sort((a, b) => a.order - b.order)
    .map((r) => ({
      id: r.id,
      key: r.key,
      label: pick(r.labelTr, r.labelEn, lang) || r.key,
      type: r.type,
      required: r.required,
      options: parseOptions(r.options, lang),
    }));
}
