'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import type { Lang } from '@/lib/i18n';

type Item = { href: string; label: string };

export default function Header({
  lang,
  brand,
  items,
  ctaLabel,
}: {
  lang: Lang;
  brand: string;
  items: Item[];
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/10 bg-white/90 backdrop-blur">
      <div className="container-content flex h-20 items-center justify-between gap-4">
        <Link href={`/${lang}`} className="flex items-center gap-3" aria-label={brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={brand} className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink/80 hover:bg-brand-paper hover:text-brand-ink"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher current={lang} />
          <Link href={`/${lang}/register`} className="btn-gold">
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-ink/15"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6h18" strokeLinecap="round" />
                <path d="M3 12h18" strokeLinecap="round" />
                <path d="M3 18h18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-brand-ink/10 bg-white">
          <div className="container-content py-4 flex flex-col gap-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink/80 hover:bg-brand-paper"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 pt-3">
              <LanguageSwitcher current={lang} />
              <Link
                href={`/${lang}/register`}
                className="btn-gold"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
