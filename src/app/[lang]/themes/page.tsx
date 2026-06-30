import { notFound } from 'next/navigation';
import { isLang, pick } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ThemesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;
  const themes = await prisma.theme.findMany({ orderBy: { order: 'asc' } });

  return (
    <>
      <PageHeader
        kicker={t('themes.kicker', lang === 'tr' ? 'Program' : 'Programme')}
        title={t('themes.title', lang === 'tr' ? 'Ana Temalar' : 'Main Themes')}
        subtitle={t(
          'themes.subtitle',
          lang === 'tr'
            ? 'Aramadan üretime, finansmandan toplumsal kabule sekiz başlık altında konferansın gündemi.'
            : 'The eight pillars of the conference agenda — from exploration to production and from financing to social license.',
        )}
      />

      <div className="container-content section grid gap-6">
        {themes.map((th) => (
          <article
            key={th.id}
            className="rounded-2xl border border-brand-ink/10 bg-white p-6 lg:p-8 shadow-sm"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 grid h-14 w-14 place-items-center rounded-xl bg-brand-green text-white font-display text-xl font-bold">
                {th.numberLabel || th.order}
              </div>
              <div>
                <h2 className="h-display text-2xl text-brand-ink">{pick(th.titleTr, th.titleEn, lang)}</h2>
                <p className="mt-2 text-brand-ink/75 leading-relaxed whitespace-pre-line">
                  {pick(th.descriptionTr, th.descriptionEn, lang)}
                </p>
              </div>
            </div>
          </article>
        ))}
        {themes.length === 0 ? (
          <p className="text-brand-ink/60">
            {lang === 'tr' ? 'Tema bilgileri yakında eklenecektir.' : 'Themes will be added soon.'}
          </p>
        ) : null}
      </div>
    </>
  );
}
