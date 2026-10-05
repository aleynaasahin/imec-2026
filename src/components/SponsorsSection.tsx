import { Lang, pick } from '@/lib/i18n';
import type { Sponsor, SponsorTier } from '@prisma/client';

type TierWithSponsors = SponsorTier & { sponsors: Sponsor[] };

export default function SponsorsSection({
  tiers,
  lang,
  heading,
  enabled,
}: {
  tiers: TierWithSponsors[];
  lang: Lang;
  heading: string;
  enabled: boolean;
}) {
  if (!enabled) return null;
  const nonEmpty = tiers.filter((t) => t.sponsors.length > 0);
  if (nonEmpty.length === 0) return null;

  return (
    <section className="section bg-white border-y border-brand-ink/10">
      <div className="container-content">
        <h2 className="h-display text-2xl lg:text-3xl text-center mb-10">{heading}</h2>

        <div className="space-y-10">
          {nonEmpty.map((tier) => (
            <div key={tier.id}>
              <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-green mb-5">
                {pick(tier.nameTr, tier.nameEn, lang)}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                {tier.sponsors.map((s) =>
                  s.url ? (
                    <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}>
                      <SponsorLogo logo={s.logoUrl} name={s.name} />
                    </a>
                  ) : (
                    <SponsorLogo key={s.id} logo={s.logoUrl} name={s.name} />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorLogo({ logo, name }: { logo: string; name: string }) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <div className="w-40 h-24 lg:w-48 lg:h-28 p-4 grid place-items-center rounded-lg bg-white border border-brand-ink/10 transition hover:shadow-md">
        <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  return (
    <div className="w-40 h-24 lg:w-48 lg:h-28 p-4 grid place-items-center rounded-lg border border-brand-ink/15 text-sm text-center text-brand-ink/60">
      {name}
    </div>
  );
}
