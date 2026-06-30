import Link from 'next/link';

type SocialLink = { name: string; href: string; icon: 'instagram' | 'youtube' | 'linkedin' | 'x' | 'facebook' };

export default function Footer({
  lang,
  about,
  contactEmail,
  contactPhone,
  organizerNote,
  bottomNote,
  social,
  navTitle,
  contactTitle,
  followTitle,
  navItems,
}: {
  lang: 'tr' | 'en';
  about: string;
  contactEmail: string;
  contactPhone: string;
  organizerNote: string;
  bottomNote: string;
  social: SocialLink[];
  navTitle: string;
  contactTitle: string;
  followTitle: string;
  navItems: { href: string; label: string }[];
}) {
  return (
    <footer className="mt-16 border-t border-brand-ink/10 bg-brand-paper">
      <div className="container-content py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="IMEC 2026" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-brand-ink/70 leading-relaxed">{about}</p>
        </div>

        <div>
          <h4 className="font-semibold text-brand-ink mb-3">{navTitle}</h4>
          <ul className="space-y-1.5 text-sm">
            {navItems.map((it) => (
              <li key={it.href}>
                <Link className="text-brand-ink/70 hover:text-brand-ink" href={it.href}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-brand-ink mb-3">{contactTitle}</h4>
          <ul className="space-y-1.5 text-sm text-brand-ink/70">
            {contactEmail ? (
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-brand-ink">
                  {contactEmail}
                </a>
              </li>
            ) : null}
            {contactPhone ? <li>{contactPhone}</li> : null}
            <li>Ankara, Türkiye</li>
            <li>4-6 {lang === 'tr' ? 'Kasım' : 'November'} 2026</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-brand-ink mb-3">{followTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {social.map((s) =>
              s.href ? (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-brand-ink/10 text-brand-ink/70 hover:text-brand-green"
                  aria-label={s.name}
                  title={s.name}
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-ink/10 bg-white">
        <div className="container-content py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-ink/60">
          <p>{bottomNote}</p>
          <p>{organizerNote}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: SocialLink['icon'] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  } as const;
  switch (icon) {
    case 'instagram':
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 .9 1.6c.2.5.4 1.2.5 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6.9c-.5.2-1.2.4-2.4.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1.1-.5-1.6-1s-.8-1-.9-1.6c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-.9c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2C3 8.5 3 8.8 3 12s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2 .4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2-.4C15.5 4 15.2 4 12 4zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 1.8a3 3 0 100 6 3 3 0 000-6zm5-2.4a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM19 19h-3v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V9h2.9v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V19z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common}>
          <path d="M18.244 2H21l-6.45 7.37L22 22h-6.84l-4.78-6.25L4.8 22H2l6.91-7.9L2 2h6.97l4.32 5.71L18.244 2zm-2.4 18h1.9L7.27 4H5.27l10.575 16z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
        </svg>
      );
  }
}
