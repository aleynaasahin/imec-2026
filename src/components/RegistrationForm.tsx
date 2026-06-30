'use client';

import { useState } from 'react';

export type FormFieldDef = {
  id: number;
  key: string;
  label: string;
  type: string;
  required: boolean;
  options: { value: string; label: string }[];
};

export default function RegistrationForm({
  fields,
  lang,
  labels,
}: {
  fields: FormFieldDef[];
  lang: 'tr' | 'en';
  labels: {
    submit: string;
    submitting: string;
    success: string;
    errorGeneric: string;
    requiredHint: string;
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
    const data: Record<string, string> = {};
    for (const [key, val] of formData.entries()) {
      data[key] = typeof val === 'string' ? val : '';
    }
    // Validate required + email format
    for (const f of fields) {
      const v = (data[f.key] || '').trim();
      if (f.required && !v) {
        setError(labels.requiredHint + ': ' + f.label);
        setSubmitting(false);
        return;
      }
      if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setError(labels.errorGeneric + ' (' + f.label + ')');
        setSubmitting(false);
        return;
      }
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, lang }),
      });
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

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {fields.map((f) => (
        <div key={f.id}>
          <label className="label" htmlFor={`f_${f.key}`}>
            {f.label}
            {f.required ? <span className="ml-1 text-red-500">*</span> : null}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              id={`f_${f.key}`}
              name={f.key}
              className="input min-h-[120px]"
              required={f.required}
            />
          ) : f.type === 'select' ? (
            <select
              id={`f_${f.key}`}
              name={f.key}
              className="input"
              required={f.required}
              defaultValue=""
            >
              <option value="" disabled>
                {lang === 'tr' ? 'Seçiniz' : 'Please select'}
              </option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : f.type === 'checkbox' ? (
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name={f.key} value="1" />
              {f.label}
            </label>
          ) : (
            <input
              id={`f_${f.key}`}
              name={f.key}
              type={f.type === 'email' ? 'email' : f.type === 'phone' ? 'tel' : 'text'}
              className="input"
              required={f.required}
            />
          )}
        </div>
      ))}

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
