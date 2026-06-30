'use client';

import { useState } from 'react';

export default function UploadField({
  name,
  defaultValue,
  accept = 'image/*',
}: {
  name: string;
  defaultValue: string;
  accept?: string;
}) {
  const [value, setValue] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError(j?.error || 'Yükleme başarısız');
      } else {
        const j = await res.json();
        setValue(j.url);
      }
    } catch {
      setError('Yükleme başarısız');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-brand-ink/15 rounded-lg p-3 bg-brand-paper/50">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="max-h-32 mx-auto rounded" />
        ) : (
          <p className="text-center text-xs text-brand-ink/50 py-6">Görsel yok</p>
        )}
      </div>
      <input type="file" accept={accept} onChange={onChange} className="text-xs" />
      <input type="hidden" name={name} value={value} />
      {value ? (
        <button
          type="button"
          onClick={() => setValue('')}
          className="text-xs text-red-600 hover:underline"
        >
          Görseli temizle
        </button>
      ) : null}
      {uploading ? <p className="text-xs text-brand-ink/60">Yükleniyor…</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
