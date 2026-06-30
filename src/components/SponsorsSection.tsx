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
              <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
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
      <img src={logo} alt={name} className="h-16 w-auto max-w-[160px] object-contain grayscale hover:grayscale-0 transition" />
    );
  }
  return (
    <div className="h-16 px-4 grid place-items-center rounded-md border border-brand-ink/15 text-sm text-brand-ink/60">
      {name}
    </div>
  );
}
