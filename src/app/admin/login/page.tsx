'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get('redirect') || '/admin';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError(j?.error || 'Giriş başarısız / Login failed');
      } else {
        router.replace(redirect);
        router.refresh();
      }
    } catch {
      setError('Giriş başarısız / Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-paper grid place-items-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-brand-ink/10 shadow-sm p-8">
        <div className="flex flex-col items-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="IMEC 2026" className="h-14 w-auto" />
          <h1 className="mt-4 text-lg font-display font-bold text-brand-ink">Admin Girişi</h1>
          <p className="text-xs text-brand-ink/60">IMEC 2026 yönetim paneli</p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <label className="label">Kullanıcı Adı</label>
            <input
              className="input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Şifre</label>
            <input
              className="input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <div className="rounded-md border border-red-300 bg-red-50 p-2.5 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
