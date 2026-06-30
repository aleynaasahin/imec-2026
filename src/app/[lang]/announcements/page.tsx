import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, pick } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

function fd(d: Date, lang: 'tr' | 'en') {
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export default async function AnnouncementsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;
  const items = await prisma.announcement.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <>
      <PageHeader
        kicker={t('ann.kicker', lang === 'tr' ? 'Güncel' : 'Updates')}
        title={t('ann.title', lang === 'tr' ? 'Duyurular' : 'Announcements')}
        subtitle={t(
          'ann.subtitle',
          lang === 'tr'
            ? 'Etkinlikten son haberler, program değişiklikleri ve önemli açıklamalar.'
            : 'Latest news, programme updates and important announcements about the conference.',
        )}
      />
      <div className="container-content section grid gap-5">
        {items.length === 0 ? (
          <p className="text-brand-ink/60">
            {lang === 'tr' ? 'Henüz yayınlanmış bir duyuru yok.' : 'No announcements have been published yet.'}
          </p>
        ) : (
          items.map((a) => {
            const title = pick(a.titleTr, a.titleEn, lang);
            const body = pick(a.bodyTr, a.bodyEn, lang);
            return (
              <Link
                key={a.id}
                href={`/${lang}/announcements/${a.slug}`}
                className="card flex flex-col sm:flex-row gap-5 hover:border-brand-green/40"
              >
                {a.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.imageUrl}
                    alt={title}
                    className="h-40 sm:h-32 sm:w-48 w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="h-40 sm:h-32 sm:w-48 w-full rounded-md bg-gradient-to-br from-brand-green/15 to-brand-gold/20" />
                )}
                <div className="flex-1">
                  <p className="text-xs text-brand-ink/60">{fd(a.publishedAt, lang)}</p>
                  <h2 className="text-lg font-semibold text-brand-ink mt-1">{title}</h2>
                  <p className="text-sm text-brand-ink/70 mt-1 line-clamp-2">{body}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
