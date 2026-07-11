import { notFound } from 'next/navigation';
import { isLang, pick } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function SpeakersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const groups = await prisma.speakerGroup.findMany({
    orderBy: { order: 'asc' },
    include: { speakers: { where: { published: true }, orderBy: { order: 'asc' } } },
  });
  const nonEmpty = groups.filter((g) => g.speakers.length > 0);

  const topicLabel = t('speakers.topicLabel', lang === 'tr' ? 'Konu' : 'Topic');

  return (
    <>
      <PageHeader
        kicker={t('speakers.kicker', lang === 'tr' ? 'Konuşmacılar' : 'Speakers')}
        title={t('speakers.title', lang === 'tr' ? 'Konuşmacılar' : 'Speakers')}
        subtitle={t(
          'speakers.subtitle',
          lang === 'tr'
            ? 'IMEC 2026 kapsamında sahne alacak yurt içi ve yurt dışından uzman konuşmacılar.'
            : 'Expert speakers from Türkiye and abroad taking part in IMEC 2026.',
        )}
      />

      <div className="container-content section grid gap-12">
        {nonEmpty.map((g) => (
          <section key={g.id}>
            <h2 className="h-display text-2xl text-brand-ink mb-6">{pick(g.nameTr, g.nameEn, lang)}</h2>
            <div className="grid gap-5 md:grid-cols-2 items-start">
              {g.speakers.map((s) => {
                const title = pick(s.titleTr, s.titleEn, lang);
                const topic = pick(s.topicTr, s.topicEn, lang);
                const bio = pick(s.bioTr, s.bioEn, lang);
                return (
                  <article key={s.id} className="card">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 shrink-0 rounded-full bg-brand-paper overflow-hidden grid place-items-center text-brand-ink/40">
                        {s.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.photoUrl} alt={s.fullName} className="h-full w-full object-cover" />
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 21a8 8 0 0116 0" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-brand-ink">{s.fullName}</p>
                        {title ? <p className="text-sm text-brand-ink/65">{title}</p> : null}
                        {s.organization ? (
                          <p className="text-xs text-brand-ink/55 mt-0.5">{s.organization}</p>
                        ) : null}
                      </div>
                    </div>
                    {topic ? (
                      <p className="mt-4 text-sm">
                        <span className="font-semibold text-brand-green">{topicLabel}: </span>
                        <span className="text-brand-ink/80">{topic}</span>
                      </p>
                    ) : null}
                    {bio ? (
                      <p className="mt-3 text-sm text-brand-ink/65 leading-relaxed">{bio}</p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {nonEmpty.length === 0 ? (
          <p className="text-brand-ink/60">
            {t('speakers.empty', lang === 'tr' ? 'Konuşmacı listesi yakında yayınlanacaktır.' : 'The speaker list will be published soon.')}
          </p>
        ) : null}
      </div>
    </>
  );
}
