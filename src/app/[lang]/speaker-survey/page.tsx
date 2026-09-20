import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import SpeakerSurveyForm from '@/components/SpeakerSurveyForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SpeakerSurveyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const tr = lang === 'tr';

  return (
    <>
      <PageHeader
        kicker={tr ? 'Konuşmacılara Özel' : 'For Speakers Only'}
        title={tr ? 'IMEC 2026 Konuşmacı Anketi' : 'IMEC 2026 Speaker Survey'}
        subtitle={
          tr
            ? "MAPEG himayelerinde 4-6 Kasım 2026 tarihlerinde Ankara'da düzenlenecek IMEC 2026 - Uluslararası Maden Arama Konferansı'na konuşmacı olarak katkılarınız için teşekkür ederiz. Programın sağlıklı yürütülmesi için aşağıdaki birkaç soruyu yanıtlamanızı rica ederiz."
            : "Thank you for contributing as a speaker to IMEC 2026 - International Mineral Exploration Conference, held in Ankara on 4-6 November 2026 under the auspices of MAPEG. To help us run the programme smoothly, please answer the short questions below."
        }
      />
      <div className="container-content section grid lg:grid-cols-[1fr_2fr] gap-10">
        <aside className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-brand-ink">{tr ? 'Etkinlik Tarihi' : 'Event Date'}</h3>
            <p className="mt-1 text-brand-ink/70">{tr ? '4-6 Kasım 2026' : '4-6 November 2026'}</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-brand-ink">{tr ? 'Yer' : 'Venue'}</h3>
            <p className="mt-1 text-brand-ink/70">Ankara, Türkiye</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-brand-ink">{tr ? 'Sorularınız için' : 'For questions'}</h3>
            <p className="mt-1 text-brand-ink/70 text-sm">
              {shell.contactEmail ? (
                <a className="hover:text-brand-green" href={`mailto:${shell.contactEmail}`}>
                  {shell.contactEmail}
                </a>
              ) : (
                '—'
              )}
            </p>
          </div>
        </aside>
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs font-medium text-brand-ink/60">
              {tr ? 'Dil / Language:' : 'Language / Dil:'}
            </span>
            <LanguageSwitcher current={lang} />
          </div>
          <div className="card">
            <SpeakerSurveyForm
              lang={lang}
              labels={{
                submit: tr ? 'Yanıtları Gönder' : 'Submit Answers',
                submitting: tr ? 'Gönderiliyor…' : 'Submitting…',
                success: tr
                  ? 'Yanıtlarınız alınmıştır. Katkılarınız için teşekkür ederiz!'
                  : 'Your answers have been received. Thank you for your contribution!',
                errorGeneric: tr
                  ? 'Bir sorun oluştu. Lütfen zorunlu alanları kontrol edip tekrar deneyin.'
                  : 'Something went wrong. Please check the required fields and try again.',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
