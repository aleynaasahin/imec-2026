'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return { d, h, m, s, done: false };
}

export default function Countdown({
  targetIso,
  lang,
  title,
}: {
  targetIso: string;
  lang: Lang;
  title: string;
}) {
  const target = new Date(targetIso);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [targetIso]);

  const labels =
    lang === 'tr'
      ? { d: 'Gün', h: 'Saat', m: 'Dakika', s: 'Saniye', done: 'Etkinlik başladı!' }
      : { d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds', done: 'The event has started!' };

  if (t.done) {
    return (
      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-6 text-center">
        <p className="text-brand-ink font-semibold">{labels.done}</p>
      </div>
    );
  }

  const items = [
    { v: t.d, l: labels.d },
    { v: t.h, l: labels.h },
    { v: t.m, l: labels.m },
    { v: t.s, l: labels.s },
  ];

  return (
    <div className="rounded-2xl border border-brand-ink/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-brand-ink/60 mb-4 text-center">{title}</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {items.map((it) => (
          <div key={it.l} className="rounded-xl bg-brand-paper p-3 sm:p-4 text-center">
            <div className="font-display text-2xl sm:text-4xl font-bold text-brand-green tabular-nums">
              {String(it.v).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-ink/60 mt-1">
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
