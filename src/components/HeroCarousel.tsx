'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { pick } from '@/lib/i18n';

export type Slide = {
  id: number;
  imageUrl: string;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  subtitleEn: string;
  buttonTextTr: string;
  buttonTextEn: string;
  buttonUrl: string;
};

export default function HeroCarousel({
  slides,
  lang,
  intervalMs = 6000,
}: {
  slides: Slide[];
  lang: Lang;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (slides.length <= 1) return;
    function tick() {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % slides.length);
      }
      timerRef.current = setTimeout(tick, intervalMs);
    }
    timerRef.current = setTimeout(tick, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slides.length, intervalMs]);

  if (slides.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-brand-green via-brand-green-dark to-[#5b6e2c] text-white">
        <div className="container-content py-20 lg:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">
            {lang === 'tr' ? 'Ankara · 4-6 Kasım 2026' : 'Ankara · 4-6 November 2026'}
          </p>
          <h1 className="h-display text-4xl lg:text-6xl mt-3 max-w-3xl">
            {lang === 'tr'
              ? 'Uluslararası Maden Arama Konferansı'
              : 'International Mineral Exploration Conference'}
          </h1>
          <p className="mt-5 max-w-2xl text-white/90 text-lg">
            {lang === 'tr'
              ? 'Maden aramanın bilimsel, teknik, çevresel, hukuki ve finansal boyutlarını tek bir çatı altında buluşturan uluslararası buluşma.'
              : 'An international forum bringing together the scientific, technical, environmental, legal and financial dimensions of mineral exploration.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-brand-ink text-white"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="relative h-[460px] sm:h-[520px] lg:h-[600px]">
        {slides.map((s, i) => {
          const title = pick(s.titleTr, s.titleEn, lang);
          const subtitle = pick(s.subtitleTr, s.subtitleEn, lang);
          const buttonText = pick(s.buttonTextTr, s.buttonTextEn, lang);
          const active = i === index;
          return (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }}
              aria-hidden={!active}
            >
              {s.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt={title || 'IMEC 2026'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green-dark to-[#5b6e2c]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
              <div className="relative z-10 h-full">
                <div className="container-content h-full flex items-center">
                  <div className="max-w-3xl">
                    {title ? (
                      <h1 className="h-display text-3xl sm:text-4xl lg:text-6xl leading-tight">{title}</h1>
                    ) : null}
                    {subtitle ? (
                      <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90">{subtitle}</p>
                    ) : null}
                    {buttonText && s.buttonUrl ? (
                      <div className="mt-7">
                        <Link href={s.buttonUrl} className="btn-gold">
                          {buttonText}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 grid place-items-center"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 grid place-items-center"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'bg-white w-6' : 'bg-white/50 w-2'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
