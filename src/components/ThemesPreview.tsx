import Link from 'next/link';
import { Lang, pick } from '@/lib/i18n';
import type { Theme } from '@prisma/client';

export default function ThemesPreview({
  themes,
  lang,
  heading,
  subheading,
  viewAllLabel,
}: {
  themes: Theme[];
  lang: Lang;
  heading: string;
  subheading: string;
  viewAllLabel: string;
}) {
  if (themes.length === 0) return null;
  return (
    <section className="section bg-white">
      <div className="container-content">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
            {lang === 'tr' ? 'Konferans Temaları' : 'Conference Themes'}
          </p>
          <h2 className="h-display text-3xl lg:text-4xl mt-2">{heading}</h2>
          <p className="mt-3 text-brand-ink/70">{subheading}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {themes.map((t) => (
            <article
              key={t.id}
              className="group relative rounded-xl border border-brand-ink/10 bg-white p-5 hover:border-brand-green/40 transition shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-brand-green/60 font-bold">
                  {t.numberLabel || `0${t.order || 0}`}
                </span>
                <span className="h-8 w-8 rounded-full bg-brand-green/10 grid place-items-center text-brand-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-brand-ink">{pick(t.titleTr, t.titleEn, lang)}</h3>
              <p className="mt-2 text-sm text-brand-ink/65 line-clamp-3">
                {pick(t.descriptionTr, t.descriptionEn, lang)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link href={`/${lang}/themes`} className="btn-secondary">
            {viewAllLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
