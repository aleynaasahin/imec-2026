'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/admin', label: 'Panel' },
  { href: '/admin/content', label: 'Metinler' },
  { href: '/admin/hero', label: 'Manşet Slaytları' },
  { href: '/admin/themes', label: 'Temalar' },
  { href: '/admin/speakers', label: 'Konuşmacılar' },
  { href: '/admin/sponsors', label: 'Sponsorlar' },
  { href: '/admin/announcements', label: 'Duyurular' },
  { href: '/admin/committees', label: 'Komiteler' },
  { href: '/admin/form-fields', label: 'Kayıt Formu' },
  { href: '/admin/registrations', label: 'Kayıtlar' },
  { href: '/admin/speaker-survey', label: 'Konuşmacı Anketi' },
  { href: '/admin/media', label: 'Medya / Logolar' },
  { href: '/admin/settings', label: 'Ayarlar' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/admin';
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      <header className="bg-white border-b border-brand-ink/10 sticky top-0 z-30">
        <div className="px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-9 w-9 rounded-md border border-brand-ink/15 grid place-items-center"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="IMEC" className="h-9 w-auto" />
            <span className="font-semibold text-sm text-brand-ink">Admin Paneli</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="text-xs text-brand-ink/60 hover:text-brand-ink">
              Siteyi gör ↗
            </Link>
            <button onClick={logout} className="btn-secondary !py-1.5 !px-3 !text-sm">
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            open ? 'block' : 'hidden'
          } lg:block w-64 shrink-0 border-r border-brand-ink/10 bg-white min-h-[calc(100vh-56px)] sticky top-14`}
        >
          <nav className="p-3 grid gap-1">
            {nav.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive(it.href)
                    ? 'bg-brand-green text-white'
                    : 'text-brand-ink/80 hover:bg-brand-paper'
                }`}
              >
                {it.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
