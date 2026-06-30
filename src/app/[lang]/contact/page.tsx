import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  return (
    <>
      <PageHeader
        kicker={t('contact.kicker', lang === 'tr' ? 'Bize Ulaşın' : 'Get in Touch')}
        title={t('contact.title', lang === 'tr' ? 'İletişim' : 'Contact')}
        subtitle={t(
          'contact.subtitle',
          lang === 'tr'
            ? 'Sorularınız, sponsor talepleri ve iş birlikleri için bizimle iletişime geçebilirsiniz.'
            : 'Reach out for questions, sponsorship enquiries and collaboration opportunities.',
        )}
      />

      <div className="container-content section grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('contact.emailHeading', lang === 'tr' ? 'E-posta' : 'Email')}
            </h3>
            <p className="mt-1 text-brand-ink/70">
              {shell.contactEmail ? (
                <a className="hover:text-brand-green" href={`mailto:${shell.contactEmail}`}>
                  {shell.contactEmail}
                </a>
              ) : (
                '—'
              )}
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('contact.phoneHeading', lang === 'tr' ? 'Telefon' : 'Phone')}
            </h3>
            <p className="mt-1 text-brand-ink/70">{shell.contactPhone || '—'}</p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-brand-ink">
              {t('contact.locationHeading', lang === 'tr' ? 'Konum' : 'Location')}
            </h3>
            <p className="mt-1 text-brand-ink/70">Ankara, Türkiye</p>
            <p className="text-sm text-brand-ink/60 mt-1">
              4-6 {lang === 'tr' ? 'Kasım' : 'November'} 2026
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="font-semibold text-brand-ink mb-1">
            {t('contact.formHeading', lang === 'tr' ? 'Mesaj Gönderin' : 'Send a Message')}
          </h3>
          <p className="text-sm text-brand-ink/60 mb-5">
            {t(
              'contact.formNote',
              lang === 'tr'
                ? 'Mesajınızı doğrudan e-posta uygulamanız üzerinden ileteceğiz.'
                : 'Your message will be opened in your email client.',
            )}
          </p>
          <ContactForm
            lang={lang}
            email={shell.contactEmail}
            l={{
              name: t('contact.f.name', lang === 'tr' ? 'Ad Soyad' : 'Full Name'),
              email: t('contact.f.email', lang === 'tr' ? 'E-posta' : 'Email'),
              subject: t('contact.f.subject', lang === 'tr' ? 'Konu' : 'Subject'),
              message: t('contact.f.message', lang === 'tr' ? 'Mesajınız' : 'Your Message'),
              send: t('contact.f.send', lang === 'tr' ? 'Gönder' : 'Send'),
            }}
          />
        </div>
      </div>
    </>
  );
}

function ContactForm({
  lang,
  email,
  l,
}: {
  lang: 'tr' | 'en';
  email: string;
  l: { name: string; email: string; subject: string; message: string; send: string };
}) {
  return (
    <form
      action={`mailto:${email || 'info@imec.com.tr'}`}
      method="post"
      encType="text/plain"
      className="grid gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{l.name}</label>
          <input className="input" name="name" required />
        </div>
        <div>
          <label className="label">{l.email}</label>
          <input className="input" type="email" name="email" required />
        </div>
      </div>
      <div>
        <label className="label">{l.subject}</label>
        <input className="input" name="subject" required />
      </div>
      <div>
        <label className="label">{l.message}</label>
        <textarea className="input min-h-[140px]" name="message" required />
      </div>
      <div>
        <button className="btn-primary" type="submit">
          {l.send}
        </button>
      </div>
    </form>
  );
}
