import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLang, pick } from '@/lib/i18n';
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

export default async function AnnouncementDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const a = await prisma.announcement.findUnique({ where: { slug } });
  if (!a || !a.published) notFound();

  const title = pick(a.titleTr, a.titleEn, lang);
  const body = pick(a.bodyTr, a.bodyEn, lang);

  return (
    <>
      <PageHeader
        kicker={fd(a.publishedAt, lang)}
        title={title}
      />
      <article className="container-content section max-w-3xl">
        {a.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.imageUrl} alt={title} className="w-full rounded-xl mb-8" />
        ) : null}
        <div className="prose-content text-brand-ink/85 leading-relaxed whitespace-pre-line">
          {body}
        </div>
        <div className="mt-10">
          <Link href={`/${lang}/announcements`} className="btn-secondary">
            ← {lang === 'tr' ? 'Tüm Duyurular' : 'All Announcements'}
          </Link>
        </div>
      </article>
    </>
  );
}
