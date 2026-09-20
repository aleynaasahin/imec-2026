'use client';

import { useState } from 'react';

type YesNoOption = { value: string; tr: string; en: string };

const YES_NO: YesNoOption[] = [
  { value: 'yes', tr: 'Evet', en: 'Yes' },
  { value: 'no', tr: 'Hayır', en: 'No' },
];

const YES_NO_MAYBE: YesNoOption[] = [
  { value: 'yes', tr: 'Evet', en: 'Yes' },
  { value: 'no', tr: 'Hayır', en: 'No' },
  { value: 'maybe', tr: 'Belki', en: 'Maybe' },
];

const PAPER_OPTIONS: YesNoOption[] = [
  { value: 'yes', tr: 'Evet, göndereceğim', en: 'Yes, I will send it' },
  { value: 'no', tr: 'Hayır', en: 'No' },
  { value: 'undecided', tr: 'Henüz karar vermedim', en: 'Not decided yet' },
];

function Select({
  name,
  lang,
  options,
  required,
}: {
  name: string;
  lang: 'tr' | 'en';
  options: YesNoOption[];
  required?: boolean;
}) {
  return (
    <select id={`f_${name}`} name={name} className="input" required={required} defaultValue="">
      <option value="" disabled>
        {lang === 'tr' ? 'Seçiniz' : 'Please select'}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {lang === 'tr' ? o.tr : o.en}
        </option>
      ))}
    </select>
  );
}

function Field({
  htmlFor,
  label,
  hint,
  required,
  children,
}: {
  htmlFor: string;
  label: string;
  hint?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label" htmlFor={htmlFor}>
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      {hint ? <p className="text-xs text-brand-ink/55 mb-1.5">{hint}</p> : null}
      {children}
    </div>
  );
}

export default function SpeakerSurveyForm({
  lang,
  labels,
}: {
  lang: 'tr' | 'en';
  labels: {
    submit: string;
    submitting: string;
    success: string;
    errorGeneric: string;
  };
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-6 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-green text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-semibold text-brand-ink">{labels.success}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/speaker-survey', { method: 'POST', body: formData });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError(j?.error || labels.errorGeneric);
      } else {
        setDone(true);
      }
    } catch {
      setError(labels.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  const tr = lang === 'tr';

  return (
    <form onSubmit={onSubmit} className="grid gap-6" encType="multipart/form-data">
      <div className="grid gap-5 md:grid-cols-2">
        <Field htmlFor="f_fullName" label={tr ? 'Ad Soyad' : 'Full Name'} required>
          <input id="f_fullName" name="fullName" type="text" className="input" required />
        </Field>
        <Field htmlFor="f_email" label={tr ? 'E-posta' : 'Email'} required>
          <input id="f_email" name="email" type="email" className="input" required />
        </Field>
      </div>
      <Field htmlFor="f_organization" label={tr ? 'Kurum / Unvan (güncel)' : 'Organization / Title (current)'}>
        <input id="f_organization" name="organization" type="text" className="input" />
      </Field>

      <hr className="border-brand-ink/10" />

      <Field
        htmlFor="f_registered"
        label={
          tr
            ? 'Katılım (kayıt) linkinden kaydınızı tamamladınız mı?'
            : 'Have you completed your registration via the participation link?'
        }
        hint={
          <>
            {tr ? 'Zaten kayıtlıysanız "Evet" seçiniz. Kayıt linki: ' : 'If you have already registered, select "Yes". Registration link: '}
            <a
              href={`/${lang}/register`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-green underline hover:text-brand-green-dark"
            >
              mineralexplorationconference.com/{lang}/register
            </a>
          </>
        }
        required
      >
        <Select name="registered" lang={lang} options={YES_NO} required />
      </Field>

      <Field
        htmlFor="f_followsLinkedin"
        label={tr ? 'IMEC 2026 LinkedIn sayfasını takip ediyor musunuz?' : 'Do you follow the IMEC 2026 LinkedIn page?'}
        required
      >
        <Select name="followsLinkedin" lang={lang} options={YES_NO} required />
      </Field>

      <Field
        htmlFor="f_recommendOthers"
        label={
          tr
            ? 'Katılımcı olacak yakınlarınıza kayıt olmalarını ve sosyal medya hesabımızı takip etmelerini tavsiye eder misiniz?'
            : 'Would you recommend that colleagues attending register and follow our social media account?'
        }
      >
        <Select name="recommendOthers" lang={lang} options={YES_NO_MAYBE} />
      </Field>

      <Field
        htmlFor="f_joinWhatsapp"
        label={
          tr
            ? 'Yurt içi ve yurt dışından konuşmacıların yer aldığı koordinasyon WhatsApp grubuna katılmayı onaylıyor musunuz?'
            : 'Do you agree to join the coordination WhatsApp group for domestic and international speakers?'
        }
      >
        <Select name="joinWhatsapp" lang={lang} options={YES_NO} />
      </Field>

      <Field
        htmlFor="f_infoCorrection"
        label={
          tr
            ? 'Bilgilerinizde (unvan, kurum, konuşma başlığı, özgeçmiş) bir düzeltme/güncelleme var mı?'
            : 'Any corrections/updates needed to your details (title, organization, talk title, bio)?'
        }
        hint={tr ? 'Varsa lütfen aşağıya yazınız.' : 'Please describe below, if any.'}
      >
        <textarea id="f_infoCorrection" name="infoCorrection" className="input min-h-[100px]" />
      </Field>

      <Field
        htmlFor="f_mediaConsent"
        label={
          tr
            ? 'Bilgilerinizin konferans internet sitesi ve sosyal medya hesaplarında tanıtım amaçlı kullanılmasını onaylıyor musunuz?'
            : 'Do you consent to your details being used for promotional purposes on the conference website and social media?'
        }
        required
      >
        <Select name="mediaConsent" lang={lang} options={YES_NO} required />
      </Field>

      <Field
        htmlFor="f_photo"
        label={tr ? 'Fotoğrafınız' : 'Your photo'}
        hint={
          tr
            ? 'Onaylıyorsanız, kullanılmasını istediğiniz bir fotoğrafınızı yükleyebilirsiniz (daha önce gönderdiyseniz atlayabilirsiniz). JPG/PNG, en fazla 8MB.'
            : 'If you consent, you may upload a photo you would like us to use (skip if already sent). JPG/PNG, max 8MB.'
        }
      >
        <input id="f_photo" name="photo" type="file" accept="image/*" className="input" />
      </Field>

      <Field
        htmlFor="f_paperSubmission"
        label={
          tr
            ? 'Sunum metninizi 15 Ekim 2026 tarihine kadar göndermeyi planlıyor musunuz?'
            : 'Do you plan to submit your paper/presentation text by 15 October 2026?'
        }
        hint={
          tr
            ? 'Konferans sunum metinlerinin bir araya getirildiği bir yayın planlanmaktadır. Bu, isteğe bağlıdır, zorunlu değildir.'
            : 'A compilation publication of conference papers is planned. This is optional, not mandatory.'
        }
      >
        <Select name="paperSubmission" lang={lang} options={PAPER_OPTIONS} />
      </Field>

      <Field
        htmlFor="f_youtubeConsent"
        label={
          tr
            ? 'Konferansın YouTube üzerinden canlı yayınlanmasını ve sunumunuzun sonrasında MAYEM YouTube kanalında ayrıca yer almasını onaylıyor musunuz?'
            : 'Do you consent to the conference being live-streamed on YouTube, and your talk later being posted separately on the MAYEM YouTube channel?'
        }
        required
      >
        <Select name="youtubeConsent" lang={lang} options={YES_NO} required />
      </Field>

      <Field
        htmlFor="f_journalConsent"
        label={
          tr
            ? "Sunumunuzun, MAYEM'in yayınladığı dergilerde metin olarak yer almasına izin veriyor musunuz?"
            : 'Do you allow your presentation to appear as text in journals published by MAYEM?'
        }
        required
      >
        <Select name="journalConsent" lang={lang} options={YES_NO} required />
      </Field>

      <Field
        htmlFor="f_travelNeeded"
        label={tr ? 'Ankara\'ya ulaşım ve konaklama konusunda desteğe ihtiyacınız var mı?' : 'Do you need support with travel and accommodation in Ankara?'}
      >
        <Select name="travelNeeded" lang={lang} options={YES_NO} />
      </Field>
      <Field
        htmlFor="f_travelDetails"
        label={tr ? 'Varsa ulaşım/konaklama talebinizin detayları' : 'If so, details of your travel/accommodation request'}
        hint={tr ? 'Şehir, tarih, tercihler vb.' : 'City, dates, preferences, etc.'}
      >
        <textarea id="f_travelDetails" name="travelDetails" className="input min-h-[90px]" />
      </Field>

      {error ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? labels.submitting : labels.submit}
        </button>
      </div>
    </form>
  );
}
