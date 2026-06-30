'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/lib/i18n';

export default function LanguageSwitcher({ current }: { current: Lang }) {
  const pathname = usePathname() || '/tr';
  const rest = pathname.replace(/^\/(tr|en)/, '') || '/';

  const trHref = `/tr${rest === '/' ? '' : rest}`;
  const enHref = `/en${rest === '/' ? '' : rest}`;

  const base = 'px-2 py-1 text-sm font-semibold rounded';
  const active = 'bg-brand-green text-white';
  const inactive = 'text-brand-ink/70 hover:text-brand-ink';

  return (
    <div className="flex items-center gap-1 rounded-md border border-brand-ink/10 bg-white p-0.5">
      <Link href={trHref} className={`${base} ${current === 'tr' ? active : inactive}`}>
        TR
      </Link>
      <Link href={enHref} className={`${base} ${current === 'en' ? active : inactive}`}>
        EN
      </Link>
    </div>
  );
}
