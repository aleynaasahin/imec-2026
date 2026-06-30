import { notFound } from 'next/navigation';
import { isLang, pick } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function CommitteesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const groups = await prisma.committeeGroup.findMany({
    orderBy: { order: 'asc' },
    include: { members: { orderBy: { order: 'asc' } } },
  });

  return (
    <>
      <PageHeader
        kicker={t('committees.kicker', lang === 'tr' ? 'Ekip' : 'Team')}
        title={t('committees.title', lang === 'tr' ? 'Komiteler' : 'Committees')}
        subtitle={t(
          'committees.subtitle',
          lang === 'tr'
            ? 'Konferansın koordinasyon ve düzenleme komitelerinde görev alan üyeler.'
            : 'Members of the coordination and organizing committees of the conference.',
        )}
      />

      <div className="container-content section grid gap-10">
        {groups.map((g) => (
          <section key={g.id}>
            <h2 className="h-display text-2xl text-brand-ink mb-5">{pick(g.nameTr, g.nameEn, lang)}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.members.map((m) => (
                <article key={m.id} className="card flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-full bg-brand-paper overflow-hidden grid place-items-center text-brand-ink/40">
                    {m.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photoUrl} alt={m.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0116 0" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-ink">{m.fullName}</p>
                    <p className="text-sm text-brand-ink/65">{pick(m.titleTr, m.titleEn, lang)}</p>
                    {m.affiliation ? (
                      <p className="text-xs text-brand-ink/55 mt-0.5">{m.affiliation}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 ? (
          <p className="text-brand-ink/60">
            {lang === 'tr' ? 'Komite bilgileri yakında eklenecektir.' : 'Committee information coming soon.'}
          </p>
        ) : null}
      </div>
    </>
  );
}
