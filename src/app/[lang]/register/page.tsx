import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/PageHeader';
import RegistrationForm from '@/components/RegistrationForm';
import { toFieldDefs } from '@/lib/formFields';

export const dynamic = 'force-dynamic';

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const rows = await prisma.formField.findMany();
  const fields = toFieldDefs(rows, lang);

  return (
    <>
      <PageHeader
        kicker={t('register.kicker', lang === 'tr' ? 'Kayıt' : 'Registration')}
        title={t('register.title', lang === 'tr' ? 'IMEC 2026 Kayıt Formu' : 'IMEC 2026 Registration')}
        subtitle={t(
          'register.subtitle',
          lang === 'tr'
            ? 'Konferansa katılmak için aşağıdaki formu doldurunuz. Kaydınız ekibimize ulaşacaktır.'
            : 'Fill in the form below to attend the conference. Your registration will reach our team.',
        )}
      />
      <div className="container-content section grid lg:grid-cols-[1fr_2fr] gap-10">
        <aside className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('register.dateHeading', lang === 'tr' ? 'Etkinlik Tarihi' : 'Event Date')}
            </h3>
            <p className="mt-1 text-brand-ink/70">
              {lang === 'tr' ? '4-6 Kasım 2026' : '4-6 November 2026'}
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('register.locationHeading', lang === 'tr' ? 'Yer' : 'Venue')}
            </h3>
            <p className="mt-1 text-brand-ink/70">Ankara, Türkiye</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('register.contactHeading', lang === 'tr' ? 'Sorularınız için' : 'For questions')}
            </h3>
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
        <div className="card">
          {fields.length === 0 ? (
            <p className="text-brand-ink/60">
              {lang === 'tr'
                ? 'Kayıt formu henüz hazır değil. Yakında tekrar deneyin.'
                : 'The registration form is not ready yet. Please check back soon.'}
            </p>
          ) : (
            <RegistrationForm
              fields={fields}
              lang={lang}
              labels={{
                submit: t('register.submit', lang === 'tr' ? 'Kaydı Tamamla' : 'Submit Registration'),
                submitting: t('register.submitting', lang === 'tr' ? 'Gönderiliyor…' : 'Submitting…'),
                success: t(
                  'register.success',
                  lang === 'tr'
                    ? 'Kaydınız alındı. Teşekkür ederiz!'
                    : 'Your registration has been received. Thank you!',
                ),
                errorGeneric: t(
                  'register.errorGeneric',
                  lang === 'tr'
                    ? 'Lütfen tüm zorunlu alanları doğru şekilde doldurun.'
                    : 'Please fill in all required fields correctly.',
                ),
                requiredHint: t(
                  'register.requiredHint',
                  lang === 'tr' ? 'Bu alan zorunludur' : 'This field is required',
                ),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
