import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ProgramPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const body = t('program.body', '');

  return (
    <>
      <PageHeader
        kicker={t('program.kicker', lang === 'tr' ? 'Program' : 'Programme')}
        title={t('program.title', lang === 'tr' ? 'Konferans Programı' : 'Conference Programme')}
        subtitle={t(
          'program.subtitle',
          lang === 'tr'
            ? 'Oturumlar, saatler ve salon bilgileri yakında bu sayfada yayınlanacaktır.'
            : 'Sessions, timings and room details will be published on this page soon.',
        )}
      />
      <div className="container-content section max-w-3xl">
        {body ? (
          <div className="text-brand-ink/80 leading-relaxed whitespace-pre-line">{body}</div>
        ) : (
          <div className="card text-center py-14">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-green/10 text-brand-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-brand-ink/60">
              {t('program.empty', lang === 'tr' ? 'Detaylı program yakında yayınlanacaktır.' : 'The detailed programme will be published soon.')}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
